# include path to PlotDFT.jl
using PlotDFT

# Import DOS
dos = import_DOS_VASP()

# Plot total DOS in absolute units of eV
p1 = plot_DOS(dos, eaxis="absolute")

# Display what DOS info is available for plotting
dos
# You will see the following:
# Main.PlotDFT.DOSinfo: Al₃Sc
#  Atom type 1: Sc
#  Atom type 2: Al
#  Projected DOS is l-decomposed: (1) s, (2) p, (3) d
#  Fermi energy: 7.2264, α+β: -14.5222

# Plot the Sc d projected DOS on our TDOS.
p2 = PlotDFT.plot_pDOS(p1, dos, atom=1, pdos="d", color="#FF0000")


# Adjust plot formatting! Change title, title positioning, color, etc.
# See https://plotly.com/julia/reference/layout/ for options!
PlotDFT.relayout!(
    p2,
    title_text = "DOS distribution of AuCu<sub>3</sub>-type ScAl<sub>3</sub>",
    title_x = 0.5,
    xaxis_title_text = "states per eV",
    yaxis_title_text = "Energy (eV)",
    showlegend = false
)

# Show p2 again
p2

# Save figures. (uncomment to use)
# Choose from:
# .pdf, .html, .json, .png, .svg, .jpeg, .webp!

# PlotDFT.savefig(p2, width=400, height=800, "ScAl3_Sc_d_pdos.svg")