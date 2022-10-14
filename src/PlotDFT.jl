module PlotDFT

using Xtal
using Plots
using Plots.PlotMeasures

include("DOS.jl")
export import_DOS_VASP, num_electrons_at_energy, energy_at_electron_ct, plot_DOS, plot_pDOS,
pDOS_options, adjust_plot

end