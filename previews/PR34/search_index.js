var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"DocTestSetup  = quote\n    using RadiationSpectra\nend","category":"page"},{"location":"api/#Types","page":"API","title":"Types","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:type]","category":"page"},{"location":"api/#Functions","page":"API","title":"Functions","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:function]","category":"page"},{"location":"api/#Documentation","page":"API","title":"Documentation","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [RadiationSpectra]\nOrder = [:type, :function]","category":"page"},{"location":"api/#RadiationSpectra.AbstractFitFunction","page":"API","title":"RadiationSpectra.AbstractFitFunction","text":"AbstractFitFunction{T, ND, NP}\n\nAbstract type for an ND-dimensional fit of eltype T with NP parameters.\n\n\n\n\n\n","category":"type"},{"location":"api/#RadiationSpectra.FitFunction","page":"API","title":"RadiationSpectra.FitFunction","text":"mutable struct FitFunction{T, ND, NP} <: AbstractFitFunction{T, ND, NP}\n\nT: Precision type\n\nND: Dimensionality\n\nNP: NP parameters\n\nFields:\n\nmodel::Function: Function of the fit model.\nfitranges::NTuple{N, Vector{T}}: Range on which the fit is performed.\nparameter_names::Vector{Symbol}: Parameters names.\nfitted_parameters::Vector{T}: Fitted parameters.\ninitial_parameters::Vector{T}: Initial parameters.\n\n\n\n\n\n","category":"type"},{"location":"api/#RadiationSpectra.calibrate_spectrum-Union{Tuple{E}, Tuple{T}, Tuple{StatsBase.Histogram{var\"#s117\",1,E} where var\"#s117\"<:Real,Array{var\"#s116\",1} where var\"#s116\"<:Real}} where E where T","page":"API","title":"RadiationSpectra.calibrate_spectrum","text":"calibrate_spectrum(h_uncal::Histogram, photon_lines::Array{Real, 1}; <keyword arguments>)\n\nReturns the calibrated histogram, the deconvoluted spectrum, the found (uncalibrated) peak positions and the final threshold value.\n\nKeywords\n\nσ::Real = 2.0: The expected sigma of a peak in the spectrum. In units of bins.\nthreshold::Real = 10.0: Threshold for being identified as a peak in the deconvoluted spectrum. A single bin is identified as a peak when its weight exceeds the threshold and the previous bin was not identified as an peak.\nmin_n_peaks::Int = 0: If the number of found peaks is smaller than min_n_peaks the functions lowers the parameter threshold until enough peaks are found.\nmax_n_peaks::Int = 50: Use only the first (strongest) max_n_peaks peaks for peak identification.\nα::Real = 0.005:  = 0.5%. Acceptance level in the comparison of the peak position ratios in the peak indentification step. When the difference between the ratio of two found peak positions and the ratio of two photon lines (photon_lines) is smaller than α, the found peaks are identified as the two photon lines.\nrtol::Real = 5e-3:  = 5e-3. Acceptance level for tolerance of the absolute difference between true and found line position.\n\nCalibrate the spectrum h_uncal. This is done by:\n\nfinding peaks through devoncolution\nidentifying them through comparison of the ratios of their positions with the ratios of the known lines\nfitting all identified peaks (with a gaussian plus first order polynomial) to get their position more precisely\nperforme a linear fit (offset forced to 0) of these positions vs the true positions (lines) to get the calibration constant\n\n\n\n\n\n","category":"method"},{"location":"api/#RadiationSpectra.fit_single_peak_histogram-Union{Tuple{StatsBase.Histogram}, Tuple{T}, Tuple{StatsBase.Histogram,Union{Missing, Tuple{T,T}}}} where T<:Real","page":"API","title":"RadiationSpectra.fit_single_peak_histogram","text":"fit_single_peak_histogram(h::StatsBase.Histogram, fitrange::Union{Tuple{T,T}, Missing} = missing; fit_function = :Gauss, weights = missing )::FitFunction{T, 1, NP} where {T <: AbstractFloat, NP}\n\nThis method is meant for quick and stable fitting. The estimation of initial parameters is done automatically, this allows and easy fit with just one line of code. The user is expected to pass a histogram containing only one peak or specify corresponding fitrange. The method performs a least square fit with the model specified under  fit_function = .... Currently supported are :Gauss (default), :Gauss_pol1, Cauchy.\n\n\n\n\n\n","category":"method"},{"location":"api/#RadiationSpectra.fit_single_peak_histogram_refined-Union{Tuple{StatsBase.Histogram}, Tuple{T}, Tuple{StatsBase.Histogram,Union{Missing, Tuple{T,T}}}} where T<:Real","page":"API","title":"RadiationSpectra.fit_single_peak_histogram_refined","text":"fit_single_peak_histogram_refined(h::StatsBase.Histogram, fitrange::Union{Tuple{T,T}, Missing} = missing; n_sig = 3.0, fit_function = :Gauss, weights = missing )::FitFunction{T, 1, NP} where {T <: AbstractFloat, NP}\n\nThis method is meant for quick and stable fitting. The estimation of initial parameters is done automatically, this allows and easy fit with just one line of code. The user is expected to pass a histogram containing only one peak or specify corresponding fitrange. The method performs a least square fit with the model specified under  fit_function = .... Currently supported are :Gauss (default), :Gausspol1, Cauchy. It then fits again using the results of the first fit as initial parameters. The fitrange for the second fit can be customized using the `nsig = ...` keyword.\n\n\n\n\n\n","category":"method"},{"location":"api/#RadiationSpectra.get_example_spectrum-Tuple{}","page":"API","title":"RadiationSpectra.get_example_spectrum","text":"get_example_spectrum()::Histogram\n\nReturns an uncalibrated radiation spectrum for testing and demonstrating purpose.\n\n\n\n\n\n","category":"method"},{"location":"api/#RadiationSpectra.llhfit!-Union{Tuple{NP}, Tuple{T}, Tuple{FitFunction{T,1,NP},StatsBase.Histogram}} where NP where T<:AbstractFloat","page":"API","title":"RadiationSpectra.llhfit!","text":"llhfit!(fit::FitFunction{T, 1, NP}, h::Histogram)::Nothing where {T <: AbstractFloat, NP}\n\nPerforms a log-likelihood fit of the model function fit.model and the initial parameters fit.initial_parameters on the histogram h in the range fit.fitranges[1]. The determined parameters are stored in fit.fitted_parameters.\n\nThe likelihood for each individual bin is the Poission distribution.\n\n\n\n\n\n","category":"method"},{"location":"api/#RadiationSpectra.lsqfit!-Union{Tuple{NP}, Tuple{T}, Tuple{FitFunction{T,1,NP},StatsBase.Histogram}} where NP where T<:AbstractFloat","page":"API","title":"RadiationSpectra.lsqfit!","text":"lsqfit!(fit::FitFunction{T, 1, NP}, h::Histogram)::Nothing where {T <: AbstractFloat, NP}\n\nPerforms a least square fit with the model fit.model and the initial parameters fit.initial_parameters on the histogram h in the range fit.fitranges[1]. The determined parameters are stored in fit.fitted_parameters.\n\n\n\n\n\n","category":"method"},{"location":"api/#RadiationSpectra.peakfinder-Tuple{StatsBase.Histogram}","page":"API","title":"RadiationSpectra.peakfinder","text":"peakfinder(h::Histogram; <keyword arguments>)::Tuple{Histogram, Array{Float64, 1}}\n\nReturns a deconvoluted spectrum and an array of peak positions.\n\nKeywords\n\nσ::Real=2.0: The expected sigma of a peak in the spectrum. In units of bins. \nthreshold::Real=10.0: Threshold for being identified as a peak in the deconvoluted spectrum. A single bin is identified as a peak when its weight exceeds the threshold and the previous bin was not identified as an peak.\nbackgroundRemove::Bool=true\ndeconIterations::Int=3\nmarkov::Bool=true\naverWindow::Int=3\n\nSource\n\nThis function is basically a copy of TSpectrum::SearchHighRes from ROOT.\n\nM.A. Mariscotti: A method for identification of peaks in the presence of background and its application to spectrum analysis. NIM 50 (1967), 309-320.\nM. Morhac;, J. Kliman, V. Matouoek, M. Veselsky, I. Turzo.:Identification of peaks in multidimensional coincidence gamma-ray spectra. NIM, A443 (2000) 108-125.\nZ.K. Silagadze, A new algorithm for automatic photopeak searches. NIM A 376 (1996), 451.\n\n\n\n\n\n","category":"method"},{"location":"man/spectrum_calibration/#Spectrum-Calibration","page":"Calibration","title":"Spectrum Calibration","text":"","category":"section"},{"location":"man/spectrum_calibration/","page":"Calibration","title":"Calibration","text":"The function RadiationSpectra.calibrate_spectrum return a calibrated spectrum of an uncalibrated one.  As input it needs the uncalibrated spectrum (StatsBase::Histogram) and a Vector of known peak positions like photon lines.","category":"page"},{"location":"man/spectrum_calibration/","page":"Calibration","title":"Calibration","text":"The calibration is based on the assumption that the calibration function is just f(x) = ccdot x.","category":"page"},{"location":"man/spectrum_calibration/","page":"Calibration","title":"Calibration","text":"using Plots, RadiationSpectra \n\nh_uncal = RadiationSpectra.get_example_spectrum()\nphoton_lines = [609.312, 911.204, 1120.287, 1460.830, 1764.494] # keV\nh_cal, h_deconv, peakPositions, threshold, c, c_precal = RadiationSpectra.calibrate_spectrum(h_uncal, photon_lines)\n\np_uncal = plot(h_uncal, st=:step, label=\"Uncalibrated spectrum\"); \np_deconv = plot(h_deconv, st=:step, label = \"Deconvoluted spectrum\");\nhline!([threshold], label = \"threshold\", lw = 1.5);\np_cal = plot(h_cal, st=:step, label=\"Calibrated spectrum\", xlabel=\"E / keV\"); \nvline!(photon_lines, lw=0.5, color=:red, label=\"Photon lines\");\nplot(p_uncal, p_deconv, p_cal, size=(800,700), layout=(3, 1), fmt=:svg) ","category":"page"},{"location":"man/spectrum_calibration/","page":"Calibration","title":"Calibration","text":"Zoom into one of the peaks:","category":"page"},{"location":"man/spectrum_calibration/","page":"Calibration","title":"Calibration","text":"p_cal = plot(h_cal, st=:step, label=\"Calibrated spectrum\", xlabel=\"E / keV\", xlims=[1440, 1480], size=[800, 400]); # hide\nvline!([1460.830], label=\"Photon line\", fmt=:svg) # hide","category":"page"},{"location":"man/spectrum_calibration/#Algorithm","page":"Calibration","title":"Algorithm","text":"","category":"section"},{"location":"man/spectrum_calibration/","page":"Calibration","title":"Calibration","text":"Deconvolution -> Peak finding \nPeak Identification - Which peak corresponds to which photon line? \nFit identified peaks \nFit determined peak positions vs 'true' positions (photon lines) to get the calibration constant c.","category":"page"},{"location":"man/fitting/#Fitting","page":"Fitting","title":"Fitting","text":"","category":"section"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Pages = [\"fitting.md\"]","category":"page"},{"location":"man/fitting/#Likelihood-(LLH)-Fit-1D-Histogram","page":"Fitting","title":"Likelihood (LLH) Fit - 1D-Histogram","text":"","category":"section"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Get a spectrum and find a peak to fit","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"using Plots, RadiationSpectra, StatsBase\n\nh_uncal = RadiationSpectra.get_example_spectrum()\nh_decon, peakpos = RadiationSpectra.peakfinder(h_uncal)\n\nstrongest_peak_bin_idx = StatsBase.binindex(h_uncal, peakpos[1])\nstrongest_peak_bin_width = StatsBase.binvolume(h_uncal, strongest_peak_bin_idx)\nstrongest_peak_bin_amplitude = h_uncal.weights[strongest_peak_bin_idx]\n\nplot(h_uncal, st=:step, xlims=[peakpos[1] - strongest_peak_bin_width * 20, peakpos[1] + strongest_peak_bin_width * 20], size=(800,400), ylims=[0, strongest_peak_bin_amplitude * 1.1], fmt =:svg)","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Write a model function","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"function model(x, par)\n    scale = par[1]\n    σ    = par[2]\n    μ     = par[3]\n    cp0   = par[4]\n    return @. scale * exp(-0.5 * ((x - μ)^2) / (σ^2)) / (sqrt(2 * π * σ^2)) + cp0\nend","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Set up the fit function RadiationSpectra.FitFunction{T}.","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"The type, a model function, the dimensionalty of the the model and the number of parameters must be specified:","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"fitfunc = RadiationSpectra.FitFunction{Float64}( model, 1, 4); # 1 dimensional, 4 parameters\nset_fitranges!(fitfunc, ((peakpos[1] - 1000, peakpos[1] + 1000),) )\np0 = (\n    A = strongest_peak_bin_amplitude * 4,\n    σ = strongest_peak_bin_width * 2,\n    μ = peakpos[1],\n    offset = 0\n)\nset_initial_parameters!(fitfunc, p0)\nfitfunc","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Performe the fit with the RadiationSpectra.llhfit!-function and plot the result","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"RadiationSpectra.llhfit!(fitfunc, h_uncal)\n\nplot(h_uncal, st=:step, xlims=[peakpos[1] - strongest_peak_bin_width * 20, peakpos[1] + strongest_peak_bin_width * 20], size=(800,400), label=\"Spectrum\", ylims=[0, strongest_peak_bin_amplitude * 1.1])\nplot!(fitfunc, h_uncal, use_initial_parameters=true, lc=:green, label=\"Guess\")\n#plot!(fitfunc, h_uncal, lc=:red, label=\"LLH Fit\\nΧ² = $(round(fitfunc.Chi2, digits=2))\", fmt=:svg) #hide\nplot!(fitfunc, h_uncal, lc=:red, label=\"LLH Fit\", fmt=:svg)","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"fitfunc # hide","category":"page"},{"location":"man/fitting/#LSQ-Fit-1D-Histogram","page":"Fitting","title":"LSQ Fit - 1D-Histogram","text":"","category":"section"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"To perfrom a LSQ Fit on a spectrum repeat the first three steps from the Likelihood (LLH) Fit - 1D-Histogram. Then,","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Perform the fit with the RadiationSpectra.lsqfit!-function and plot the result","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"RadiationSpectra.lsqfit!(fitfunc, h_uncal)\n\nplot(h_uncal, st=:step, xlims=[peakpos[1] - strongest_peak_bin_width * 20, peakpos[1] + strongest_peak_bin_width * 20], size=(800,400), label=\"Spectrum\", ylims=[0, strongest_peak_bin_amplitude * 1.1])\nplot!(fitfunc, h_uncal, use_initial_parameters=true, lc=:green, label=\"Guess\")\n#plot!(fitfunc, h_uncal, lc=:red, label=\"LSQ Fit\\nΧ² = $(round(fitfunc.Chi2, digits=2))\", fmt=:svg) #hide\nplot!(fitfunc, h_uncal, lc=:red, label=\"LSQ Fit\", fmt=:svg)","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"fitfunc # hide","category":"page"},{"location":"man/fitting/#Easy-Fitting-for-Histograms-Containing-a-Single-Peak","page":"Fitting","title":"Easy Fitting for Histograms Containing a Single Peak","text":"","category":"section"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"There are predefined fit routines RadiationSpectra.fit_single_peak_histogram, RadiationSpectra.fit_single_peak_histogram_refined that allow quick and easy fitting of standard distribution functions to histograms containing a single peak (for now supported :Gauss, :Cauchy, :Gauss_pol1, to be passed as keyword argument: fit_function = ...). Here, initial parameter guessing is attempted for you and you can obtain results in just one line.","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"subrange = (peakpos[1] - strongest_peak_bin_width * 20, peakpos[1] + strongest_peak_bin_width * 10)\nplot(h_uncal, st=:step, xlims=subrange, size=(800,400), label=\"Spectrum\", ylims=[0, strongest_peak_bin_amplitude * 1.1], lw=2)\n\nfitfunc = fit_single_peak_histogram(h_uncal, subrange, fit_function = :Gauss_pol1 )\n#plot!(fitfunc, label = \"Fit Gaussian to the data\", lw=3) #hide\nplot!(fitfunc, label = \"Fit Gaussian to the data\\nΧ² = $(round(fitfunc.Chi2, digits=2))\", lw=3)\n\nfitfunc_refined = fit_single_peak_histogram_refined(h_uncal, subrange, fit_function = :Gauss_pol1, n_sig = 3 )\n# plot!(fitfunc_refined, label = \"Fit Gaussian to the data\\nrefined parameter guessing\", fmt=:svg, line = (3, :dash, :orange)) #hide\nplot!(fitfunc_refined, label = \"Fit Gaussian to the data\\nrefined parameter guessing\\nΧ² = $(round(fitfunc_refined.Chi2, digits=2))\", fmt=:svg, line = (3, :dash, :orange))\n","category":"page"},{"location":"man/fitting/#LSQ-Fit-1D-Data-Arrays","page":"Fitting","title":"LSQ Fit - 1D-Data Arrays","text":"","category":"section"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Write a model function","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"using Plots, RadiationSpectra\nfunction model(x, par::Vector{T}) where {T}\n    cp0::T   = par[1]\n    cp1::T   = par[2]\n    return @. cp0 + cp1 * x\nend","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Create some random data","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"xdata = Float64[1, 2, 3, 6, 8, 12]\nydata = Float64[model(x, [-0.2, 0.7]) + (rand() - 0.5) for x in xdata]\nxdata_err = Float64[0.5 for i in eachindex(xdata)]\nydata_err = Float64[1 for i in eachindex(xdata)]\n\nplot(xdata, ydata, xerr=xdata_err, yerr=ydata_err, st=:scatter, size=(800,400), label=\"Data\", fmt=:svg)","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Set up the fit function RadiationSpectra.FitFunction{T}","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"fitfunc = RadiationSpectra.FitFunction{Float64}( model, 1, 2 );\nset_fitranges!(fitfunc, ((xdata[1], xdata[end]),) )\np0 = (\n    offset = 0,\n    linear_slope = 1\n)\nset_initial_parameters!(fitfunc, p0)\nprintln(fitfunc)","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"Performe the fit and plot the result","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"RadiationSpectra.lsqfit!(fitfunc, xdata, ydata, xdata_err, ydata_err) # xdata_err and ydata_err are optional\n\nplot(xdata, ydata, xerr=xdata_err, yerr=ydata_err, st=:scatter, size=(800,400), label=\"Data\")\nplot!(fitfunc, use_initial_parameters=true, lc=:green, label=\"Guess\")\nplot!(fitfunc, lc=:red, label=\"LSQ Fit\", fmt=:svg)","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"println(fitfunc) # hide","category":"page"},{"location":"man/fitting/#Uncertainty-Estimation","page":"Fitting","title":"Uncertainty Estimation","text":"","category":"section"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"For all fit backends (lsqfit!, llhfit! and batfit!) one can estimate the uncertainties of the fitted parameters","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"fitfunc.fitted_parameters","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"via","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"σs = RadiationSpectra.get_standard_deviations(fitfunc)","category":"page"},{"location":"man/fitting/","page":"Fitting","title":"Fitting","text":"The estimation is under the assumption that the probability density function of each parameter follows a normal distribution and that the parameters are uncorrelated. The returned values correspond to 1σ of the normal distributions.","category":"page"},{"location":"man/spectrum_deconvolution/#Peak-Finding-(Spectrum-Deconvolution)","page":"Peak Finding","title":"Peak Finding (Spectrum Deconvolution)","text":"","category":"section"},{"location":"man/spectrum_deconvolution/","page":"Peak Finding","title":"Peak Finding","text":"See RadiationSpectra.peakfinder","category":"page"},{"location":"man/spectrum_deconvolution/","page":"Peak Finding","title":"Peak Finding","text":"using RadiationSpectra \nh_uncal = RadiationSpectra.get_example_spectrum()\nh_decon, peakpos = RadiationSpectra.peakfinder(h_uncal)\n\nusing Plots \np_uncal = plot(h_uncal, st=:step, label=\"Uncalibrated spectrum\", c=1, lw=1.2); \np_decon = plot(peakpos, st=:vline, c=:red, label=\"Peaks\", lw=0.3);\nplot!(h_decon, st=:step, label=\"Deconvoluted spectrum\", c=1, lw=1.2); \nplot(p_uncal, p_decon, size=(800,500), layout=(2, 1), fmt=:svg) ","category":"page"},{"location":"LICENSE/#LICENSE","page":"LICENSE","title":"LICENSE","text":"","category":"section"},{"location":"LICENSE/","page":"LICENSE","title":"LICENSE","text":"using Markdown\nMarkdown.parse_file(joinpath(@__DIR__, \"..\", \"..\", \"LICENSE.md\"))","category":"page"},{"location":"#RadiationSpectra.jl","page":"Home","title":"RadiationSpectra.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"RadiationSpectra.jl provides tools to analyse Radiation Spectra.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This includes (for now):","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"man/spectrum_deconvolution.md\"]","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"man/fitting.md\"]","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"man/spectrum_calibration.md\"]","category":"page"}]
}