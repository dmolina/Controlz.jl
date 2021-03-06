# transfer functions

the response [output $Y(s)$] of a linear, time-invariant system to any input [$U(s)$] is characterized by a transfer function $g(s)=Y(s)/U(s)$.

## constructing a transfer function

we use a data structure, `TransferFunction`, to represent a transfer function. for example, consider the transfer function
$$g(s)=\dfrac{5s+1}{s^2 + 4s+5}$$.

we can construct $g(s)$ in an intuitive way that resembles the algebraic expression:

```julia
g = (5 * s + 1) / (s ^ 2 + 4 * s + 5) # way 1
```

alternatively, we can construct a `TransferFunction` using the coefficients associated with the powers of $s$ in the numerator and denominator polynomials, respectively, of $g(s)$. The coefficients of the highest powers go first.
```julia
g = TransferFunction([5, 1], [1, 4, 5]) # way 2
```

note that we defined `s` such that `s == TransferFunction([1, 0], [1])`.

as rational functions associated with a time delay, each `TransferFunction` data structure has a `numerator` (a polynomial in `:s`), `denominator` (a polynomial in `:s`), and `time_delay` (a number) attribute. access these attributes as follows:

```julia
g.numerator # 5s + 1, a `Poly`
g.denominator # s² + 4s + 5, a `Poly`
g.time_delay # 0.0, a `Float64`
```

`g.numerator` and `g.denominator` are `Poly` types from the package [Polynomials.jl](https://github.com/JuliaMath/Polynomials.jl).

## time delays

add a time delay to a transfer function as follows. 

```julia
θ = 2.0 # time delay
g = 3 / (2 * s + 1) * exp(-θ * s) # way 1
g = TransferFunction([3], [2, 1], θ) # way 2
```

the resulting transfer function `g` represents:
$$g(s)=\dfrac{3}{2s+1}e^{-2s}$$.

## zeros, poles, k-factor representation

we can write any transfer function $g(s)$ in terms of its poles ($p_j$), zeros ($z_j$), k-factor ($k$), and time delay ($\theta$):

$$g(s)=k\dfrac{\Pi_j (s-z_j)}{\Pi_j(s-p_j)}e^{-\theta s}$$

the scalar factor $k$ allows us to uniquely specify a transfer function in terms of its poles, zeros, and time delay. note that the $k$-factor is not equal to the zero-frequency gain.

for example:

$$g(s)=\dfrac{5s+1}{s^2 + 4s+5}=5\dfrac{(s+1/5)}{(s+2+i)(s+2-i)}$$

#### construting a transfer function from its zeros, poles and k-factor

```julia
g = zeros_poles_k([-1/5], [-2 + im, -2 - im], 5.0, time_delay=0.0)  # way 3
```

the `im` is the imaginary number $i$. see the [Julia docs on complex numbers](https://docs.julialang.org/en/v1/manual/complex-and-rational-numbers/).

#### computing the poles, zeros, and k-factor of a transfer function

```
g = (5 * s + 1) / (s ^ 2 + 4 * s + 5)
zeros_poles_k(g) # [-0.2], [-2-im, -2+im], 5
```

## transfer function algebra

we can add `+`, subject `-`, multiply `*`, and divide `/` transfer functions.

```julia
g1 = 3 / (s + 2)
g2 = 1 / (s + 4)

g_product = g1 * g2 # 3 / (s^2 + 6s + 8)

g_sum = g1 + g2 # (4s + 14) / (s^2 + 6s + 8)
```

## evaluate a transfer function at a complex number

for example, to evaluate $g(s)=\dfrac{4}{s+2}$ at $s=1-i$:
```julia
g = 4 / (s + 2)
evaluate(g, 2 * im) # 1 - im
```

## zero-frequency gain of a transfer function

compute the zero-frequency gain of a transfer function $g(s)$, which is $g(s)$ evaluated at $s=0$, as follows:

```julia
g = (5 * s + 1) / (s ^ 2 + 4 * s + 5)
zero_frequency_gain(g) # 0.2
```

the zero-frequency gain is the ratio of the steady state output value to the steady state input value (e.g., consider a step input). note that the zero-frequency gain could be infinite or zero, which is why we do not have a function to construct a transfer function from its zeros, poles, and *zero-frequency gain*.

## poles, zeros, and zero-frequency gain of a transfer function

compute the poles, zeros, and zero-frequency gain of a transfer function all at once as follows:

```julia
g = (5 * s + 5) / (s ^ 2 + 4 * s + 5)
z, p, gain = zeros_poles_gain(g)
# z = [-1.0]
# p = [-2-im, -2+im]
# gain  = 1.0
```

## cancel poles and zeros

cancel pairs of identical poles and zeros in a transfer function as follows:

```
g = s * (s+1) / ((s+3) * s * (s+1) ^ 2)
pole_zero_cancellation(g) # 1 / ((s+3) * (s+1))
```

note that this cancellation is not done automatically.

under the hood, we compare all pairs of poles and zeros to look for identical pairs via `isapprox`. after removing identical pole-zero pairs, we reconstruct the transfer function from the remaining poles, zeros, and k-factor. we ensure that the coefficients in the resulting rational function are real.

## detailed docs

```@docs
    TransferFunction
    zero_frequency_gain
    zeros_poles_gain
    zeros_poles_k
    pole_zero_cancellation
    evaluate
    proper
    strictly_proper
    characteristic_polynomial
    zpk_form
```
