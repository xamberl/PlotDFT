# include path to PlotDFT.jl
include("../../src/PlotDFT.jl")

# Import DOS
dos = PlotDFT.import_DOS_VASP()

# Plot total DOS in absolute units of eV
p1 = PlotDFT.plot_DOS(dos, eaxis="absolute")

# Plot total DOS ± 1 eV with xmax = 15 states/eV
# Relative units of eV (E-Ef)
p2 = PlotDFT.plot_DOS(dos, emin = -1, emax = +1, xmax = 15)

# Adjust plot formatting! Change title, title positioning, add axes labels, color, etc.
# See https://plotly.com/julia/reference/layout/ for options!
PlotDFT.relayout!(
    p2,
    title_text = "DOS distribution of CoGa<sub>3</sub>-type IrIn<sub>3</sub> near <i>E</i><sub>F</sub>",
    title_x = 0.5,
    xaxis_title_text = "states per eV",
    yaxis_title_text = "Energy (eV)",
    plot_bgcolor = :lightblue,
    showlegend = false
)

# Show p2 again
p2

# Save figures. (uncomment to use)
# Choose from:
# .pdf, .html, .json, .png, .svg, .jpeg, .webp!

# PlotDFT.savefig(p1, "CoGa3_tdos.pdf")
# PlotDFT.savefig(p2, "CoGa3_tdos1.png")