struct DOSinfo
    tdos::DensityOfStates
    pdos::Vector{ProjectedDensityOfStates}
    fermi::Float64
    alphabeta::Float64
    pos::Crystal{3}
    function DOSinfo(
        tdos::DensityOfStates,
        pdos::Vector{ProjectedDensityOfStates},
        fermi::Float64,
        alphabeta::Float64,
        pos::Crystal{3},
        )
        return new(tdos,pdos,fermi,alphabeta,pos)
    end
end

"""
    import_DOS_VASP(directory::AbstractString=="")

Imports information for plotting DOS from the VASP files DOSCAR, POSCAR, and OUTCAR.
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
    energy_at_electron_ct(tdos::DensityOfStates, electron_ct::Real)

Returns the energy of corresponding electron count using the total DOS.
"""
function energy_at_electron_ct(tdos::DensityOfStates, electron_ct::Real)
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

# A struct that can be easily saved to toggle through different pdos plots
struct pDOS_options
    ion_type_to_plot::Int
    ion_orbital_to_plot::Int
    function pDOS_options(
        ion_type_to_plot::Int,
        ion_orbital_to_plot::Int
    )
        return new(ion_type_to_plot,ion_orbital_to_plot)
    end
end

"""
    plot_DOS(dosinfo::DOSinfo, emin::Real=-20, emax::Real=0, xmax::Real=20, backend="GR")

Plots the total density of states and returns it as a plot object.
"""
function plot_DOS(dosinfo::DOSinfo, emin::Real=-20, emax::Real=0, xmax::Real=20, backend="GR")
    # Plot total DOS
    backend == "PlotlyJS" ? plotlyjs() : gr()
    p = plot(dosinfo.tdos.dos, dosinfo.tdos.energy.+dosinfo.alphabeta, color = :black)
    hline!([dosinfo.tdos.fermi+dosinfo.alphabeta], linestyle = :dash, color = :black)
    # If plotting pDOS
    adjust_plot(p,emin,emax,xmax)
    return p
end


"""
    plot_pDOS(p, dosinfo::DOSinfo, pdos_options::pDOS_options=pDOS_options(0,0))

Plots a projected density of states on top of the current density of states plot,
if the projected density of states information exists.
pdos_options (specifying which ion and orbital type to plot) must first be defined.
"""
function plot_pDOS(p, dosinfo::DOSinfo, pdos_options::pDOS_options=pDOS_options(0,0))
    if !(iszero(pdos_options.ion_orbital_to_plot) && isempty(dosinfo.pdos))
        # Gets index of unique atoms (assuming atoms are sorted by name/number)
        unique_atoms = unique(i -> dosinfo.pos.atoms[i].name, 1:length(dosinfo.pos.atoms))
        pdos_for_plot = zeros(length(dosinfo.pdos[1].dos[1,:]))
        # Determine stopping point for ion type to plot
        # If we pick the last type of atom, we go from that index to the end.
        # Otherwise, we stop at the index of the next type of atom.
        pdos_options.ion_type_to_plot == length(unique_atoms) ? stop_at = length(dosinfo.pos.atoms) : stop_at = pdos_options.ion_type_to_plot+1
        for i in unique_atoms[pdos_options.ion_type_to_plot]:stop_at
            # Sum the specified type of orbitals of the same type of atom
            pdos_for_plot = pdos_for_plot + dosinfo.pdos[i].dos[pdos_options.ion_orbital_to_plot,:]
        end
        p2 = plot!(p, pdos_for_plot, dosinfo.tdos.energy.+dosinfo.alphabeta, color = :black, fill = (0))
        return p2
    end
end

"""
    adjust_plot(p, emin::Real, emax::Real, xmax::Real)

Adjusts the range of the plot.
"""
function adjust_plot(p, emin::Real, emax::Real, xmax::Real)
    plot!(p,
    ylims = (emin,emax),
    xlims = (0,xmax),
    size = (400,800),
    legend = false,
    grid = false,
    fontfamily = "Helvetica",
    ytickfontsize = 12,
    xaxis = nothing,
    framestyle = :box,
    margin = 20px,
    )
end