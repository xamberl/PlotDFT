module PlotDFT

using Electrum
#using Plots
#using Plots.PlotMeasures
using PlotlyJS

include("datastructs.jl")

include("DOS.jl")
export import_DOS_VASP, num_electrons_at_energy, energy_at_electron_ct, plot_DOS, plot_pDOS,
plot_PHDOS, plot_pPHDOS, pDOS_options, Ha_to_THz

end
