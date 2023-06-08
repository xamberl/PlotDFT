using PlotDFT

# Import DOSCAR.lobster file. POSCAR must also be present in working directory.
dos = import_DOS_lobster()
# Plot total DOS
p = plot_DOS(dos)

# Plot projected DOS of d orbitals of atom 2 (Ir)
p1 = plot_pDOS(p, dos, atom=2, pdos="d")
# Plot projected DOS of atom of dz2 orbitals of atom 2 (Ir)
p2 = plot_pDOS(p, dos, atom=2, pdos="s")
# Plot hypothetical electron count at 17 e- per f.u.
p3 = energy_at_electron_ct(dos, 68, p1, color="gray")
# Modify entry in legend.
p3.plot.data[end].name = "17 e<sup>-</sup>/f.u."

# Format plot
# See https://plotly.com/julia/reference/layout/ for options!
PlotDFT.relayout!(
    p3,
    yaxis_title_text = "E-<i>E</i><sub>F</sub> (eV)",
    xaxis_showticklabels = false,
    xaxis_ticks = "",
); p3

#PlotDFT.savefig(p3, width=400, height=800, "IrIn3_IrIn3_lobDOS.pdf")