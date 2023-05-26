"""
    import_DOS_VASP(directory::AbstractString=="") -> DOSinfo

Imports information for plotting DOS from the VASP files DOSCAR, POSCAR, and OUTCAR and
returns it as a DOSinfo object.
"""
function import_DOS_VASP(directory::AbstractString="")
    tdos, pdos = readDOSCAR(string(directory,"DOSCAR"))
    (fermi, alphabeta) = get_fermi(string(directory,"OUTCAR"))
    pos = readPOSCAR(string(directory,"POSCAR"))
    return DOSinfo(tdos, pdos, fermi, alphabeta, pos)
end

"""
    import_DOS_lobster(directory::AbstractString=="") -> DOSinfo

Imports information for plotting DOS from DOSCAR.lobster and POSCAR
"""
function import_DOS_lobster(directory::AbstractString="")
    tdos, pdos = readDOSCAR(string(directory,"DOSCAR.lobster"))
    (fermi, alphabeta) = (0,0)
    pos = readPOSCAR(string(directory,"POSCAR"))
    return DOSinfo(tdos, pdos, fermi, alphabeta, pos)
end

"""
    num_electrons_at_energy(tdos::DensityOfStates, energy::Real) -> Float64

Returns the electron count of the unit cell at a specified energy using the total DOS.
"""
function num_electrons_at_energy(tdos::DensityOfStates, energy::Real)
    # Check energy range
    if energy < tdos.energy[1] || energy > tdos.energy[length(tdos.energy)]
        @error "Out of bounds of DOS energy range."
    end
    # Find index <= specified energy
    i = 1
    while tdos.energy[i] <= energy
        i = i+1
    end
    # Estimate integrated DOS at energy by linear interpolation
    m = (tdos.int[i]-tdos.int[i-1])/(tdos.energy[i]-tdos.energy[i-1])
    b = tdos.int[i]-m*tdos.energy[i]
    y = m*energy+b
    return y
end

"""
    energy_at_electron_ct(dosinfo::DOSinfo, electron_ct::Real) -> Float64

Returns the energy of corresponding electron count using the total DOS.
"""
function energy_at_electron_ct(dosinfo::DOSinfo, electron_ct::Real)
    tdos = dosinfo.tdos
    # Checks to see if we are in the electron count range
    if electron_ct < tdos.int[1] || electron_ct > tdos.int[length(tdos.int)]
        @error "Electron count invalid"
    end
    # Find index <= specified electron count
    i = 1
    while tdos.int[i] <= electron_ct
        i += 1
    end
    # Estimate energy at electron count by lineear interpolation
    m = (tdos.int[i]-tdos.int[i-1])/(tdos.energy[i]-tdos.energy[i-1])
    b = tdos.int[i]-m*tdos.energy[i]
    x = (electron_ct - b)/m
    return x
end

"""
    energy_at_electron_ct(
        dosinfo::DOSinfo,
        electron_ct::Real,
        plot::PlotlyJS.SyncPlot;
        color::String="red"
    )
    -> PlotlyJS.SyncPlot

Adds a horizontal dotted line to a plot corresponding to the energy at a
specified electron count.
"""
function energy_at_electron_ct(dosinfo::DOSinfo, electron_ct::Real, plot::PlotlyJS.SyncPlot; color::String="red")
    tdos = dosinfo.tdos
    p = copy(plot)
    x = energy_at_electron_ct(dosinfo, electron_ct)

    # Check to see if it is relative or absolute plotting based on fermi energy line in plot
    get(p.plot.data[2].fields, :y, nothing)[1] == 0 ? z = -dosinfo.fermi : z = dosinfo.alphabeta
    # Get xmax
    xmax = get(p.plot.data[2].fields, :x, nothing)[2]
    addtraces!(p, scatter(x = [0, xmax], y = [x+z, x+z], line_dash="dash", marker_color= color, mode="lines"))
    return p
end


"""
    plot_DOS(
        dosinfo::DOSinfo;
        emin::Real=0,
        emax::Real=0,
        xmax::Real=0,
        eaxis::String="relative"
    )
    -> PlotlyJS.SyncPlot

Returns a plot of the total density of states.
"""
function plot_DOS(dosinfo::DOSinfo; emin::Real=0, emax::Real=0, xmax::Real=0, eaxis::String="relative")
    # Check to see if plotting in relative (default) or absolute mode. Shift eaxis by δ.
    lowercase(eaxis) == "absolute" ? δ = dosinfo.alphabeta : δ = -dosinfo.fermi
    
    # Automatically sizes xmax to 1.1 of the maximum peak in the DOS
    # and the energy range from the minimum to 1 eV + the Fermi energy
    # if neither is specified
    xmax == 0 ? xmax = maximum(dosinfo.tdos.dos)*1.1 : nothing
    if (emin == 0 && emax == 0) 
        emin = minimum(dosinfo.tdos.energy.+δ)
        emax = dosinfo.fermi+δ+1
    end
    p = plot([
        # tdos
        scatter(x = dosinfo.tdos.dos, y = dosinfo.tdos.energy.+δ, marker_color=:black, mode="lines", name="Total DOS"),
        # fermi
        scatter(x = [0, xmax], y = [dosinfo.fermi+δ, dosinfo.fermi+δ], line_dash="dash", marker_color=:black, mode="lines", showlegend=false)
        ],
        dos_layout(emin, emax, xmax)
    )
end

"""
    plot_pDOS(
        plot::PlotlyJS.SyncPlot,
        dosinfo::DOSinfo,
        atom::Int,
        pdos::Vector{Int},
        color = :black
    )
    -> PlotlyJS.SyncPlot

Adds a filled projected density of states to a given plot.
"""
function plot_pDOS(plot::PlotlyJS.SyncPlot, dosinfo::DOSinfo; atom::Int, pdos::String, color::String="black")
    isempty(dosinfo.pdos) ? error("No PDOS found. Check your DOS files.") : nothing
    p = copy(plot)
    # Check to see if it is relative or absolute plotting based on fermi energy line in plot
    get(p.plot.data[2].fields, :y, nothing)[1] == 0 ? z = -dosinfo.fermi : z = dosinfo.alphabeta
    # Sum pdos for selected atom
    pdos_for_plot = zeros(length(dosinfo.pdos[1].dos[1,:]))
    label = ""
    # Determine stopping point for ion type to plot
    # If we pick the last type of atom, we go from that index to the end.
    # Otherwise, we stop at the index of the next type of atom.
    unique_atoms = unique(i -> dosinfo.pos.atoms[i].atom.name, eachindex(dosinfo.pos.atoms))
    atom == length(unique_atoms) ? stop_at = length(dosinfo.pos.atoms) : stop_at = unique_atoms[atom+1]-1
    for i in unique_atoms[atom]:stop_at
        # Check pdos for multiple types. E.g. [1, 3:5] must be [1, 3, 4, 5]
        pdos_new = Vector{Int}(undef,0)
        # Check to see if pdos is a valid option
        (pdos_range, label) = translate_pdos(i, pdos, dosinfo)
        for j in pdos_range
            if typeof(j) == UnitRange{Int}
                pdos_new = vcat(pdos_new,collect(j))
            elseif typeof(j) == Int
                pdos_new = vcat(pdos_new,j)
            end
        end
        pdos_new
        for j in pdos_new
            # Sum the specified type of orbitals of the same type of atom
            pdos_for_plot = pdos_for_plot + dosinfo.pdos[i].dos[j,:]
        end
    end
    pdosname = string(dosinfo.pos.atoms[1].atom.name, " ", label)
    addtraces!(p.plot, scatter(x = pdos_for_plot, y = dosinfo.tdos.energy.+z, marker_color = color, fill="tozerox", name=pdosname))
    return p
end

"""
    dos_layout(emin::Real, emax::Real, xmax::Real)

Returns a PlotlyJS layout object with default settings and ranges specified by
emin/emax/xmax.
"""
function dos_layout(emin::Real, emax::Real, xmax::Real)
doslayout = Layout(
    plot_bgcolor = :white,
    font_family = "Arial",
    font_color = :black,
    font_size = 14,
    width = 400,
    height = 800,
    xaxis = attr(
        range = [0, xmax],
        showline = true,
        mirror = true,
        linecolor = :black,
        linewidth = 2,
        showgrid = false,
        ticks = "outside",
        layer = "below traces",
    ),
    yaxis = attr(
        range = [emin, emax],
        showline = true,
        mirror = true,
        linecolor = :black,
        linewidth = 2,
        showgrid = false,
        ticks = "outside",
        layer = "below traces"
    )
    )
end

"""
    function translate_pdos(s::AbstractString, dosinfo::DOSinfo) -> (x, label)

For a specified string, returns a vector of Ints corresponding to the column number of the
desired PDOS to plot. Also returns a label for the legend.
"""
function translate_pdos(atom::Int, s::AbstractString, dosinfo::DOSinfo)
    s = lowercase(s)
    x = 0
    label = ""
    if size(dosinfo.pdos[atom].dos)[1] == 3
        decomp = Dict("s"=>[1], "p"=>[2], "d"=>[3])
        x = get(decomp, s, 0)
        label = s
    elseif size(dosinfo.pdos[atom].dos)[1] == 4
        decomp = Dict(
            "s"=>([1], "s"),
            "py"=>([2], "p<sub>y</sub>"),
            "pz"=>([3], "p<sub>z</sub>",),
            "px"=>([4], "p<sub>x</sub>"),
            "p"=>(collect(2:4), "p"),
        )
        (x, label) = get(decomp, s, (0,""))
    elseif size(dosinfo.pdos[atom].dos)[1] == 6
        decomp = Dict(
            "s"=>([1], "s"),
            "dxy"=>([2],"d<sub>xy</sub>"),
            "dyz"=>([3],"d<sub>yz</sub>"),
            "dz2"=>([4],"d<sub>z<sup>2<sup></sub>"),
            "dxz"=>([5],"d<sub>xz</sub>"),
            "dx2-y2"=>([6],"d<sub>x<sup>2<sup>-y<sup>2<sup></sub>"),
            "dx2y2"=>([6],"d<sub>x<sup>2<sup>-y<sup>2<sup></sub>"),
            "d"=>(collect(2:6), "d"),
        )
        (x, label) = get(decomp, s, (0,""))
    elseif size(dosinfo.pdos[atom].dos)[1] == 9
        decomp = Dict(
            "s"=>([1], "s"),
            "py"=>([2], "p<sub>y</sub>"),
            "pz"=>([3], "p<sub>z</sub>",),
            "px"=>([4], "p<sub>x</sub>"),
            "p"=>(collect(2:4), "p"),
            "dxy"=>([5],"d<sub>xy</sub>"),
            "dyz"=>([6],"d<sub>yz</sub>"),
            "dz2"=>([7],"d<sub>z<sup>2<sup></sub>"),
            "dxz"=>([8],"d<sub>xz</sub>"),
            "dx2-y2"=>([9],"d<sub>x<sup>2<sup>-y<sup>2<sup></sub>"),
            "dx2y2"=>([9],"d<sub>x<sup>2<sup>-y<sup>2<sup></sub>"),
            "d"=>(collect(5:9), "d"),
        )
        (x, label) = get(decomp, s, (0,""))
    end
    x == 0 ? error(string(s, " is not a valid option.")) : nothing
    return (x, label)
end
