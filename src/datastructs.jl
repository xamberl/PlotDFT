"""
    DOSinfo

Organizes information relevant to the plotting of the electronic density of states.
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