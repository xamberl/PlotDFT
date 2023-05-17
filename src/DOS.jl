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
        scatter(x = dosinfo.tdos.dos, y = dosinfo.tdos.energy.+δ, marker_color=:black, mode="lines"),
        # fermi
        scatter(x = [0, xmax], y = [dosinfo.fermi+δ, dosinfo.fermi+δ], line_dash="dash", marker_color=:black, mode="lines")
        ],
        dos_layout(emin, emax, xmax)
    )
end

"""
    plot_pDOS(
        plot::PlotlyJS.SyncPlot,
        dosinfo::DOSinfo;
        atom::Int,
        pdos::Int;
        color = :black
    )
    -> PlotlyJS.SyncPlot

Adds a filled projected density of states to a given plot.
"""
function plot_pDOS(plot::PlotlyJS.SyncPlot, dosinfo::DOSinfo; atom::Int, pdos::Int, color::String="black")
    isempty(dosinfo.pdos) ? error("No PDOS found. Check your DOS files.") : nothing
    p = copy(plot)
    # Check to see if it is relative or absolute plotting based on fermi energy line in plot
    get(p.plot.data[2].fields, :y, nothing)[1] == 0 ? z = -dosinfo.fermi : z = dosinfo.alphabeta
    # Sum pdos for selected atom
    pdos_for_plot = zeros(length(dosinfo.pdos[1].dos[1,:]))
    # Determine stopping point for ion type to plot
    # If we pick the last type of atom, we go from that index to the end.
    # Otherwise, we stop at the index of the next type of atom.
    unique_atoms = unique(i -> dosinfo.pos.atoms[i].atom.name, eachindex(dosinfo.pos.atoms))
    atom == length(unique_atoms) ? stop_at = length(dosinfo.pos.atoms) : stop_at = unique_atoms[atom+1]-1
    for i in unique_atoms[atom]:stop_at
        # Sum the specified type of orbitals of the same type of atom
        pdos_for_plot = pdos_for_plot + dosinfo.pdos[i].dos[pdos,:]
    end
    addtraces!(p.plot, scatter(x = pdos_for_plot, y = dosinfo.tdos.energy.+z, marker_color = color, fill="tozerox"))
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