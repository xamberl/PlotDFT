"""
    DOSinfo(
        tdos::DensityOfStates,
        pdos::Vector{ProjectedDensityOfStates},
        fermi::Real,
        alphabeta::Real,
        pos::PeriodicAtomList{3},
        )

Organizes information relevant to the plotting of the electronic density of states.
    See Electrum.jl's documentation for information about DensityOfStates,
    ProjectedDensityOfStates, and PeriodicAtomList.
"""
struct DOSinfo
    tdos::DensityOfStates
    pdos::Vector{ProjectedDensityOfStates}
    fermi::Real
    alphabeta::Real
    pos::PeriodicAtomList{3}
    function DOSinfo(
        tdos::DensityOfStates,
        pdos::Vector{ProjectedDensityOfStates},
        fermi::Real,
        alphabeta::Real,
        pos::PeriodicAtomList{3},
        )
        return new(tdos,pdos,fermi,alphabeta,pos)
    end
end

function Base.show(io::IO, ::MIME"text/plain", d::DOSinfo)
    println(io, typeof(d), ": ", Electrum.formula_string(d.pos))
    unique_atoms = unique(i -> d.pos.atoms[i].atom.name, eachindex(d.pos.atoms))
    for n in eachindex(unique_atoms)
        println(io, " Atom type ", n, ": ", d.pos[unique_atoms[n]].atom.name)
    end
    if isempty(d.pdos)
        p = "none"
    elseif size(d.pdos[1].dos)[1] == 3
        p = "l-decomposed: (1) s, (2) p, (3) d"
    elseif size(d.pdos[1].dos)[1] == 4
        p = "l-decomposed: (1) s, (2) py, (3) pz, (4) px"
    elseif size(d.pdos[1].dos)[1] == 9
        p = "lm-decomposed: (1) s, (2) py, (3) pz, (4) px, (5) dxy, (6) dyz, (7) dz2, (8) dxz, (9) dx2-y2"
    end
    println(io, " Projected DOS is ", p)
    println(io, " Fermi energy: ", d.fermi, ", α+β: ", d.alphabeta)
end