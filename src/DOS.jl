"""
    import_DOS_VASP(directory::AbstractString=="")

Imports information for plotting DOS from the VASP files DOSCAR, POSCAR, and OUTCAR.
returns dosinfo
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


"""
    plot_DOS(dosinfo::DOSinfo, emin::Real=-0, emax::Real=0, xmax::Real=0)

Plots the total density of states.
"""
function plot_DOS(dosinfo::DOSinfo; emin::Real=0, emax::Real=0, xmax::Real=0)
    # Automatically sizes xmax to 1.1 of the maximum peak in the DOS
    # and the energy range from the minimum to 1 eV + the Fermi energy
    # if neither is specified
    xmax == 0 ? xmax = maximum(dosinfo.tdos.dos)*1.1 : nothing
    if (emin == 0 && emax == 0) 
        emin = minimum(dosinfo.tdos.energy.+dosinfo.alphabeta)
        emax = dosinfo.fermi+dosinfo.alphabeta+1
    end
    p = plot([
        # tdos
        scatter(x = dosinfo.tdos.dos, y = dosinfo.tdos.energy.+dosinfo.alphabeta, marker_color=:black, mode="lines"),
        # fermi
        scatter(x = [0, xmax], y = [dosinfo.fermi+dosinfo.alphabeta, dosinfo.fermi+dosinfo.alphabeta], line_dash="dash", marker_color=:black,mode="lines")
        ],
        dos_layout(emin, emax, xmax)
    )
end


"""
    dos_layout(emin::Real, emax::Real, xmax::Real)

Returns a Plotly layout object with default settings and ranges specified by emin/emax/xmax.
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