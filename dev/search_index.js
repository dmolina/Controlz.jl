var documenterSearchIndex = {"docs":
[{"location":"tfs/#transfer-functions-1","page":"Transfer Functions","title":"transfer functions","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"the response [output Y(s)] of a linear, time-invariant system to any input [U(s)] is characterized by a transfer function g(s)=Y(s)U(s).","category":"page"},{"location":"tfs/#constructing-a-transfer-function-1","page":"Transfer Functions","title":"constructing a transfer function","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"we use a data structure, TransferFunction, to represent a transfer function. for example, consider the transfer function g(s)=dfrac5s+1s^2 + 4s+5.","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"we can construct g(s) in an intuitive way that resembles the algebraic expression:","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = (5 * s + 1) / (s ^ 2 + 4 * s + 5) # way 1","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"alternatively, we can construct a TransferFunction using the coefficients associated with the powers of s in the numerator and denominator polynomials, respectively, of g(s). The coefficients of the highest powers go first.","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = TransferFunction([5, 1], [1, 4, 5]) # way 2","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"note that we defined s such that s == TransferFunction([1, 0], [1]).","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"as rational functions associated with a time delay, each TransferFunction data structure has a numerator (a polynomial in :s), denominator (a polynomial in :s), and time_delay (a number) attribute. access these attributes as follows:","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g.numerator # 5s + 1, a `Poly`\ng.denominator # s² + 4s + 5, a `Poly`\ng.time_delay # 0.0, a `Float64`","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g.numerator and g.denominator are Poly types from the package Polynomials.jl.","category":"page"},{"location":"tfs/#time-delays-1","page":"Transfer Functions","title":"time delays","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"add a time delay to a transfer function as follows. ","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"θ = 2.0 # time delay\ng = 3 / (2 * s + 1) * exp(-θ * s) # way 1\ng = TransferFunction([3], [2, 1], θ) # way 2","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"the resulting transfer function g represents: g(s)=dfrac32s+1e^-2s.","category":"page"},{"location":"tfs/#zeros,-poles,-k-factor-representation-1","page":"Transfer Functions","title":"zeros, poles, k-factor representation","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"we can write any transfer function g(s) in terms of its poles (p_j), zeros (z_j), k-factor (k), and time delay (theta):","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g(s)=kdfracPi_j (s-z_j)Pi_j(s-p_j)e^-theta s","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"the scalar factor k allows us to uniquely specify a transfer function in terms of its poles, zeros, and time delay. note that the k-factor is not equal to the zero-frequency gain.","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"for example:","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g(s)=dfrac5s+1s^2 + 4s+5=5dfrac(s+15)(s+2+i)(s+2-i)","category":"page"},{"location":"tfs/#construting-a-transfer-function-from-its-zeros,-poles-and-k-factor-1","page":"Transfer Functions","title":"construting a transfer function from its zeros, poles and k-factor","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = zeros_poles_k([-1/5], [-2 + im, -2 - im], 5.0, time_delay=0.0)  # way 3","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"the im is the imaginary number i. see the Julia docs on complex numbers.","category":"page"},{"location":"tfs/#computing-the-poles,-zeros,-and-k-factor-of-a-transfer-function-1","page":"Transfer Functions","title":"computing the poles, zeros, and k-factor of a transfer function","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = (5 * s + 1) / (s ^ 2 + 4 * s + 5)\nzeros_poles_k(g) # [-0.2], [-2-im, -2+im], 5","category":"page"},{"location":"tfs/#transfer-function-algebra-1","page":"Transfer Functions","title":"transfer function algebra","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"we can add +, subject -, multiply *, and divide / transfer functions.","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g1 = 3 / (s + 2)\ng2 = 1 / (s + 4)\n\ng_product = g1 * g2 # 3 / (s^2 + 6s + 8)\n\ng_sum = g1 + g2 # (4s + 14) / (s^2 + 6s + 8)","category":"page"},{"location":"tfs/#evaluate-a-transfer-function-at-a-complex-number-1","page":"Transfer Functions","title":"evaluate a transfer function at a complex number","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"for example, to evaluate g(s)=dfrac4s+2 at s=1-i:","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = 4 / (s + 2)\nevaluate(g, 2 * im) # 1 - im","category":"page"},{"location":"tfs/#zero-frequency-gain-of-a-transfer-function-1","page":"Transfer Functions","title":"zero-frequency gain of a transfer function","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"compute the zero-frequency gain of a transfer function g(s), which is g(s) evaluated at s=0, as follows:","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = (5 * s + 1) / (s ^ 2 + 4 * s + 5)\nzero_frequency_gain(g) # 0.2","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"the zero-frequency gain is the ratio of the steady state output value to the steady state input value (e.g., consider a step input). note that the zero-frequency gain could be infinite or zero, which is why we do not have a function to construct a transfer function from its zeros, poles, and zero-frequency gain.","category":"page"},{"location":"tfs/#poles,-zeros,-and-zero-frequency-gain-of-a-transfer-function-1","page":"Transfer Functions","title":"poles, zeros, and zero-frequency gain of a transfer function","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"compute the poles, zeros, and zero-frequency gain of a transfer function all at once as follows:","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = (5 * s + 5) / (s ^ 2 + 4 * s + 5)\nz, p, gain = zeros_poles_gain(g)\n# z = [-1.0]\n# p = [-2-im, -2+im]\n# gain  = 1.0","category":"page"},{"location":"tfs/#cancel-poles-and-zeros-1","page":"Transfer Functions","title":"cancel poles and zeros","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"cancel pairs of identical poles and zeros in a transfer function as follows:","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"g = s * (s+1) / ((s+3) * s * (s+1) ^ 2)\npole_zero_cancellation(g) # 1 / ((s+3) * (s+1))","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"note that this cancellation is not done automatically.","category":"page"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"under the hood, we compare all pairs of poles and zeros to look for identical pairs via isapprox. after removing identical pole-zero pairs, we reconstruct the transfer function from the remaining poles, zeros, and k-factor. we ensure that the coefficients in the resulting rational function are real.","category":"page"},{"location":"tfs/#detailed-docs-1","page":"Transfer Functions","title":"detailed docs","text":"","category":"section"},{"location":"tfs/#","page":"Transfer Functions","title":"Transfer Functions","text":"    TransferFunction\n    zero_frequency_gain\n    zeros_poles_gain\n    zeros_poles_k\n    pole_zero_cancellation\n    evaluate\n    proper\n    strictly_proper\n    characteristic_polynomial\n    zpk_form","category":"page"},{"location":"tfs/#Controlz.TransferFunction","page":"Transfer Functions","title":"Controlz.TransferFunction","text":"tf = TransferFunction([1, 2], [3, 5, 8])\ntf = TransferFunction([1, 2], [3, 5, 8], 3.0)\n\nConstruct a transfer function representing a linear, time-invariant system.\n\nExample\n\nconstruct the transfer function:\n\nG(s) = frac4e^-22s2s+1\n\njulia> tf = TransferFunction([4], [2, 1], 2.2)\n\nAttributes\n\nnumerator::Poly: the polynomial in the numerator of the transfer function\ndenominator::Poly: the polynomial in the denominator of the transfer function\ntime_delay::Float64: the associated time delay\n\n\n\n\n\n","category":"type"},{"location":"tfs/#Controlz.zero_frequency_gain","page":"Transfer Functions","title":"Controlz.zero_frequency_gain","text":"K = zero_frequency_gain(tf)\n\nCompute the (signed) zero frequency gain of a transfer function g(s), which is the value of the transfer function at s=0. \"It represents the ratio of the steady state value of the output with respect to a step input\" source\n\nArguments\n\ntf::TransferFunction: the transfer function\n\n\n\n\n\n","category":"function"},{"location":"tfs/#Controlz.zeros_poles_gain","page":"Transfer Functions","title":"Controlz.zeros_poles_gain","text":"z, p, gain = zeros_poles_gain(tf)\n\nCompute the zeros, poles, and zero-frequency gain of a transfer function.\n\nthe zeros are the zeros of the numerator of the transfer function.\nthe poles are the zeros of the denominator of the transfer function.\nthe zero-frequency gain is the transfer function evaluated at s=0\n\n\n\n\n\n","category":"function"},{"location":"tfs/#Controlz.zeros_poles_k","page":"Transfer Functions","title":"Controlz.zeros_poles_k","text":"# compute the zeros, poles, and k-factor of a transfer function\nz, p, k = zeros_poles_k(tf)\n# construct a transfer function from its zeros, poles, and k-factor\ntf = zeros_poles_k(z, p, k, time_delay=0.0)\n\nthe representation of a transfer function in this context is:\n\ng(s)=kdfracPi_j (s-z_j)Pi_j (s-p_j)\n\nwhere z_j is zero j, p_j is pole j, and k is a constant factor (not equal to the zero-frequency gain) that uniquely specifies the transfer function.\n\nthe zeros are the zeros of the numerator of the transfer function.\nthe poles are the zeros of the denominator of the transfer function.\n\n\n\n\n\n","category":"function"},{"location":"tfs/#Controlz.pole_zero_cancellation","page":"Transfer Functions","title":"Controlz.pole_zero_cancellation","text":"tf = pole_zero_cancellation(tf, verbose=false)\n\nFind pairs of identical poles and zeros and return a new transfer function with the appropriate poles and zeros cancelled.  This is achieved by comparing the poles and zeros with isapprox.\n\nArguments\n\ntf::TransferFunction: the transfer function\nverbose::Bool=false: print off which poles, zeros are cancelled.\n\nExample\n\njulia> tf = s * (s - 1) / (s * (s + 1))\njulia> pole_zero_cancellation(tf) # (s-1)/(s+1)\n\n\n\n\n\n","category":"function"},{"location":"tfs/#Controlz.evaluate","page":"Transfer Functions","title":"Controlz.evaluate","text":"evaluate(tf, z)\n\nEvaluate a TransferFunction, tf, at a particular number z.\n\nExamples\n\njulia> tf = TransferFunction([1], [3, 1])\njulia> evaluate(tf, 1.0) # 0.25\njulia> evaluate(tf, 2.0 + 3.0im) # also takes imaginary numbers as input\n\n\n\n\n\n","category":"function"},{"location":"tfs/#Controlz.proper","page":"Transfer Functions","title":"Controlz.proper","text":"proper(tf)\n\nReturn true if transfer function tf is proper and false otherwise.\n\n\n\n\n\n","category":"function"},{"location":"tfs/#Controlz.strictly_proper","page":"Transfer Functions","title":"Controlz.strictly_proper","text":"strictly_proper(tf)\n\nReturn true if transfer function tf is strictly proper and false otherwise.\n\n\n\n\n\n","category":"function"},{"location":"tfs/#Controlz.characteristic_polynomial","page":"Transfer Functions","title":"Controlz.characteristic_polynomial","text":"p = characteristic_polynomial(g_ol)\n\nDetermine the characteristic polynomial associated with open loop transfer function g_ol.\n\nThe characteristic polynomial is 1+g_ol(s). The roots of the characteristic polynomial determine the character of the response of the closed loop system to bounded inputs.\n\nArguments\n\ng_ol::TransferFunction: open loop transfer function\n\nReturns\n\na polynomial of type Poly\n\nExample\n\njulia> g_ol = 4 / (s + 3) / (s + 2) / (s + 1)\njulia> characteristic_polynomial(g_ol) # s³ + 6s² + 11s + 10, a `Poly`\n\n\n\n\n\n","category":"function"},{"location":"viz/#Visualization-1","page":"Visualization","title":"Visualization","text":"","category":"section"},{"location":"viz/#poles-and-zeros-of-a-transfer-function-1","page":"Visualization","title":"poles and zeros of a transfer function","text":"","category":"section"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"g = (s + 2) / (s^2 + 1/4)\nviz_poles_and_zeros(g)","category":"page"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"(Image: )","category":"page"},{"location":"viz/#response-of-a-system-to-an-input-1","page":"Visualization","title":"response of a system to an input","text":"","category":"section"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"g = 4 / (4 * s ^ 2 + 0.8 * s + 1)\nu = 1 / s\nt, y = simulate(g * u, (0.0, 50.0))\nviz_response(t, y, plot_title=\"SO underdamped step response\")","category":"page"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"(Image: )","category":"page"},{"location":"viz/#Nyquist-diagram-1","page":"Visualization","title":"Nyquist diagram","text":"","category":"section"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"g = 1 / (s^2 + s + 1)\nnyquist_diagram(g)","category":"page"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"(Image: )","category":"page"},{"location":"viz/#Bode-plot-1","page":"Visualization","title":"Bode plot","text":"","category":"section"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"g = 3 / (s + 1)\nbode_plot(g, log10_ω_min=-4.0, log10_ω_max=4.0)","category":"page"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"(Image: )","category":"page"},{"location":"viz/#Root-locus-plot-1","page":"Visualization","title":"Root locus plot","text":"","category":"section"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"g_ol = 4 / (s + 3) / (s + 2) / (s + 1)\nroot_locus(g_ol)","category":"page"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"(Image: )","category":"page"},{"location":"viz/#hipster-plot-theme-1","page":"Visualization","title":"hipster plot theme","text":"","category":"section"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"invoke the hipster plot theme used to make plots for this documentation by:","category":"page"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"using Controlz\nusing PyPlot\nPyPlot.matplotlib.style.use(normpath(joinpath(pathof(Controlz), \"..\", \"hipster.mplstyle\")))","category":"page"},{"location":"viz/#detailed-docs-1","page":"Visualization","title":"detailed docs","text":"","category":"section"},{"location":"viz/#","page":"Visualization","title":"Visualization","text":"    viz_poles_and_zeros\n    viz_response\n    nyquist_diagram\n    bode_plot\n    root_locus","category":"page"},{"location":"viz/#Controlz.viz_poles_and_zeros","page":"Visualization","title":"Controlz.viz_poles_and_zeros","text":"viz_poles_and_zeros(tf)\n\nplot the zeros and poles of the transfer function tf in the complex plane.\n\n\n\n\n\n","category":"function"},{"location":"viz/#Controlz.viz_response","page":"Visualization","title":"Controlz.viz_response","text":"viz_response(t, y, \n             plot_title=\"\", plot_xlabel=\"time, t\", \n             plot_ylabel=\"output, y(t)\")\n\nplot y vs. t to visualize the response of a system to an input. typically t and y are outputs of simulate.\n\nArguments\n\nt::Array{Float64}: array of times\ny::Array{Float64}: array of values of response variables at the corresponding times in t\n\nExample\n\njulia> g = 4 / (4 * s ^ 2 + 0.8 * s + 1)\njulia> u = 1 / s\njulia> t, y = simulate(g * u, (0.0, 50.0))\njulia> viz_response(t, y)\n\n\n\n\n\n","category":"function"},{"location":"viz/#Controlz.nyquist_diagram","page":"Visualization","title":"Controlz.nyquist_diagram","text":"nyquist_diagram(tf)\n\nplot the Nyquist diagram for a transfer function tf to visualize its frequency response.\n\n\n\n\n\n","category":"function"},{"location":"viz/#Controlz.bode_plot","page":"Visualization","title":"Controlz.bode_plot","text":"bode_plot(tf, log10_ω_min=-4.0, log10_ω_max=4.0)\n\ndraw the Bode plot of a transfer function tf to visualize its frequency response.\n\n\n\n\n\n","category":"function"},{"location":"viz/#Controlz.root_locus","page":"Visualization","title":"Controlz.root_locus","text":"root_locus(g_ol)\n\nvisualize the root locus plot of an open-loop transfer function g_ol.\n\n\n\n\n\n","category":"function"},{"location":"sim/#Simulation-1","page":"Simulation","title":"Simulation","text":"","category":"section"},{"location":"sim/#","page":"Simulation","title":"Simulation","text":"we wish simulate to simulate the response (output) of a linear, time-invariant system, characterized by a transfer function g(s), to an input. we run the simulation in the familiar time domain by converting the system into state space and using DifferentialEquations.jl (see here) to solve the resulting ODE.","category":"page"},{"location":"sim/#","page":"Simulation","title":"Simulation","text":"learn by example! in each case, simulate returns an array of times t and corresponding output values, y.","category":"page"},{"location":"sim/#response-of-an-underdamped-second-order-system-to-a-unit-step-input-1","page":"Simulation","title":"response of an underdamped second-order system to a unit step input","text":"","category":"section"},{"location":"sim/#","page":"Simulation","title":"Simulation","text":"g = 4 / (4 * s ^ 2 + 0.8 * s + 1) # construct transfer function\nu = 1 / s # unit step input\nY = g * u # system output\nt, y = simulate(Y, 50.0) # simulate until t = 50","category":"page"},{"location":"sim/#","page":"Simulation","title":"Simulation","text":"we can then plot the y array versus the t array:","category":"page"},{"location":"sim/#","page":"Simulation","title":"Simulation","text":"(Image: )","category":"page"},{"location":"sim/#","page":"Simulation","title":"Simulation","text":"    simulate","category":"page"},{"location":"sim/#Controlz.simulate","page":"Simulation","title":"Controlz.simulate","text":"t, y = simulate(Y, final_time, nb_time_points=100) # invert Y(s)\n\nSimulate the output y(t) of an LTI system, given the Laplace transform of the output, Y(s), Y.\n\nArguments\n\nY::TransferFunction: the Laplace transform of the output y(t). Usually formed by g(s)U(s), where U(s) is the Laplace transform of the input.\nfinal_time::Tuple{Float64, Float64}: the duration over which to simulate the output of the LTI system, starting at time zero.\nnb_time_points::Int=100: the number of time points at which to save the solution y(t)\n\nTwo points before time zero are included to illustrate that it is assumed y(t)=0 for t0.\n\nReturns\n\nt::Array{Float64, 1}: array of times t at which the solution was saved\ny::Array{Float64, 1}: array of y values at corresponding times in t\n\nExample\n\nOne can simulate the first order step response as, given the Laplace transform of the output, Y:\n\njulia> g = 4 / (3 * s + 1) # first-order transfer function\njulia> u = 1 / s #  unit step input\njulia> Y = g / s\njulia> t, y = simulate(Y, 12.0)\n\n\n\n\n\n","category":"function"},{"location":"#Controlz.jl-1","page":"Controlz","title":"Controlz.jl","text":"","category":"section"},{"location":"#","page":"Controlz","title":"Controlz","text":"Controlz.jl is a Julia package to explore concepts in the simulation of process dynamics and control of linear, time-invariant (LTI) systems using transfer function representations.","category":"page"},{"location":"#","page":"Controlz","title":"Controlz","text":"For example, to simulate the unit step response of a second-order, underdamped system characterized by the transfer function","category":"page"},{"location":"#","page":"Controlz","title":"Controlz","text":"g(s) = dfrac44s^2 + 08s +1","category":"page"},{"location":"#","page":"Controlz","title":"Controlz","text":"the output Y(s) follows from g(s)U(s), where U(s) is the input.","category":"page"},{"location":"#","page":"Controlz","title":"Controlz","text":"using Controlz\n\ng = 4 / (4 * s ^ 2 + 0.8 * s + 1) # construct transfer function\nU = 1 / s # unit step input, U(s)\nY = g * U # system output, Y(s)\n\nt, y = simulate(Y, 50.0) # simulate until t = 50\n\nviz_response(t, y, title=\"SO underdamped step response\")","category":"page"},{"location":"#","page":"Controlz","title":"Controlz","text":"(Image: )","category":"page"},{"location":"#install-the-Controlz.jl-package-in-Julia-1","page":"Controlz","title":"install the Controlz.jl package in Julia","text":"","category":"section"},{"location":"#","page":"Controlz","title":"Controlz","text":"in the Julia REPL: go into package mode by typing ]. Then add Controlz#master. Then Backspace to exit package mode.\nin Jupyter Notebook or Julia code: using Pkg; Pkg.add(\"Controlz#master\").","category":"page"},{"location":"#","page":"Controlz","title":"Controlz","text":"for visualization, Controlz.jl relies on PyPlot.jl, a Julia interface to matplotlib in Python. see here if you have trouble installing PyPlot.jl.","category":"page"},{"location":"faq/#frequently-asked-questions-(FAQ)-1","page":"FAQ","title":"frequently asked questions (FAQ)","text":"","category":"section"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"is Controlz.jl well-tested?","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"many tests are all here. run the tests by using Controlz, Pkg; Pkg.test(\"Controlz\"). that said, this package is not tested enough such that it can be used to design engineering control systems. Controlz.jl is for educational purposes at this point.","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"is Conrolz.jl free to use?","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"yes, Controlz.jl is free and open. see the associated MIT license here. the source code is on Github here.","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"I'm completely new to Julia and don't know where to start.","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"Julia is a free and open-source, high-performance, dynamic programming language designed especially for numerical computing. See here for resources on learning Julia. I recommend Jupyter Lab or Jupyter Notebook as an interactive development environment for Julia.","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"I found a bug.","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"please post an issue here.","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"may I contribute to the package?","category":"page"},{"location":"faq/#","page":"FAQ","title":"FAQ","text":"absolutely! especially for fixing bugs, making documentation clearer, providing examples, etc. as for new features, please post an issue with your plan for a pull request first.","category":"page"}]
}
