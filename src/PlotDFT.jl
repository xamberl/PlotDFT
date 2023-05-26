module PlotDFT

using Electrum
using PlotlyJS

include("datastructs.jl")
export DOSinfo

include("DOS.jl")
export import_DOS_VASP, import_DOS_lobster, num_electrons_at_energy, energy_at_electron_ct, plot_DOS, plot_pDOS,
dos_layout

end
