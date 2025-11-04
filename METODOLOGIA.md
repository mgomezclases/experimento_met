# Planteamiento Metodológico: Análisis de Contrastes de Hipótesis

## 1. Introducción

Este documento presenta el planteamiento metodológico para el análisis sistemático de contrastes de hipótesis estadísticas, desarrollado a partir del estudio de conceptos fundamentales y su correcta interpretación.

## 2. Objetivos del Planteamiento Metodológico

### 2.1 Objetivo General
Desarrollar un marco metodológico integral para el análisis, interpretación y aplicación de contrastes de hipótesis estadísticas, que permita a investigadores tomar decisiones fundamentadas basadas en evidencia empírica.

### 2.2 Objetivos Específicos
1. Establecer un protocolo estandarizado para la formulación de hipótesis
2. Definir criterios claros para la selección de niveles de significación
3. Desarrollar un sistema de interpretación rigurosa de p-valores
4. Implementar procedimientos para el cálculo y análisis de potencia estadística
5. Crear herramientas de visualización para facilitar la comprensión de conceptos

## 3. Marco Conceptual

### 3.1 Fundamentos Teóricos

La metodología se basa en la teoría de Neyman-Pearson para contrastes de hipótesis, complementada con la interpretación de Fisher sobre el p-valor. Se reconocen dos enfoques principales:

**Enfoque de Neyman-Pearson:**
- Establece dos hipótesis: nula (H₀) y alternativa (H₁)
- Define errores tipo I (α) y tipo II (β)
- Enfatiza el control a largo plazo de tasas de error
- Introduce el concepto de potencia (1 - β)

**Enfoque de Fisher:**
- Utiliza el p-valor como medida continua de evidencia
- No establece un punto de corte dicotómico
- Considera el p-valor como indicador de la compatibilidad entre datos y H₀

### 3.2 Corrección de Concepciones Erróneas

La metodología identifica y corrige siete concepciones erróneas comunes:

| Concepto | Error Común | Interpretación Correcta |
|----------|-------------|-------------------------|
| Nivel de significación | P(H₀ es falsa) | P(Rechazar H₀ \| H₀ cierta) = α |
| Error Tipo I | Cualquier error | Rechazar H₀ cuando es cierta |
| P-valor | P(H₀ cierta \| datos) | P(datos o más extremos \| H₀) |
| Potencia | P(Aceptar H₀ \| H₀ cierta) | P(Rechazar H₀ \| H₀ falsa) = 1-β |

## 4. Metodología de Análisis

### 4.1 Fase I: Diseño del Estudio

**Paso 1: Definición del Problema**
- Identificar la pregunta de investigación
- Definir la población objetivo
- Establecer el parámetro de interés (μ, p, σ², etc.)

**Paso 2: Formulación de Hipótesis**
```
H₀: Hipótesis nula (status quo)
H₁: Hipótesis alternativa (bilateral, unilateral derecha, unilateral izquierda)
```

**Paso 3: Análisis de Potencia A Priori**
- Determinar el tamaño del efecto mínimo relevante (δ)
- Establecer la potencia deseada (usualmente 1-β ≥ 0.80)
- Calcular el tamaño muestral necesario (n)

Fórmula general para pruebas de medias:
```
n ≈ 2(z_α/2 + z_β)² (σ²/δ²)
```

**Paso 4: Selección del Nivel de Significación**

Criterios para seleccionar α:

| Contexto | α Recomendado | Justificación |
|----------|---------------|---------------|
| Investigación exploratoria | 0.10 | Mayor tolerancia a errores tipo I |
| Investigación estándar | 0.05 | Balance convencional |
| Investigación confirmatoria | 0.01 | Mayor rigor, menor error tipo I |
| Aplicaciones médicas críticas | 0.001 | Minimizar consecuencias de decisiones erróneas |

### 4.2 Fase II: Recolección de Datos

**Consideraciones metodológicas:**
- Diseño muestral apropiado (aleatorio simple, estratificado, etc.)
- Control de variables confusoras
- Verificación de supuestos del modelo
- Registro sistemático de observaciones

### 4.3 Fase III: Análisis Estadístico

**Paso 1: Verificación de Supuestos**
- Normalidad (Shapiro-Wilk, Q-Q plots)
- Homocedasticidad (Levene, Bartlett)
- Independencia de observaciones
- Tamaño muestral adecuado

**Paso 2: Cálculo del Estadístico de Prueba**

Ejemplos según el tipo de contraste:

| Prueba | Estadístico | Distribución |
|--------|-------------|--------------|
| Media, σ conocida | z = (x̄ - μ₀)/(σ/√n) | Normal estándar |
| Media, σ desconocida | t = (x̄ - μ₀)/(s/√n) | t de Student (n-1 gl) |
| Proporción | z = (p̂ - p₀)/√[p₀(1-p₀)/n] | Normal estándar (n grande) |
| Varianza | χ² = (n-1)s²/σ₀² | Chi-cuadrado (n-1 gl) |

**Paso 3: Determinación del P-valor**

El p-valor se calcula según el tipo de alternativa:

```
Bilateral (H₁: θ ≠ θ₀):    p-valor = 2·P(|T| ≥ |t_obs|)
Unilateral derecha:        p-valor = P(T ≥ t_obs)
Unilateral izquierda:      p-valor = P(T ≤ t_obs)
```

### 4.4 Fase IV: Interpretación de Resultados

**Decisión Estadística:**

```
Si p-valor ≤ α: Rechazar H₀
Si p-valor > α: No rechazar H₀
```

**Interpretación Contextual:**

La decisión estadística debe complementarse con:
1. **Tamaño del efecto:** Magnitud práctica de la diferencia
2. **Intervalo de confianza:** Rango plausible para el parámetro
3. **Relevancia práctica:** ¿Es el efecto importante en el contexto?
4. **Limitaciones:** Validez interna y externa del estudio

**Reporte de Resultados:**

Formato recomendado:
```
"Se realizó una prueba [tipo] para evaluar [hipótesis].
El estadístico fue [valor] (gl = [grados de libertad], p = [p-valor exacto]).
Intervalo de confianza del 95%: [límite inferior, límite superior].
Tamaño del efecto: [medida] = [valor].
[Conclusión contextualizada]"
```

### 4.5 Fase V: Análisis de Potencia Post Hoc

Cuando no se rechaza H₀, es importante evaluar:
- ¿Tenía el estudio suficiente potencia?
- ¿Qué tamaño de efecto podría detectarse con 80% de potencia?

Cálculo de potencia observada:
```
Potencia = 1 - β = P(Rechazar H₀ | δ, n, α)
```

## 5. Propiedades Lógicas de los Contrastes

### 5.1 Jerarquía de Niveles de Significación

**Propiedad 1: Monotonía hacia arriba**
```
Si rechazamos H₀ al nivel α₁, entonces también la rechazamos a todo nivel α₂ > α₁
```

**Ejemplo:**
- Si p-valor = 0.02
- Rechazamos a α = 0.05 ✓
- Rechazamos a α = 0.10 ✓
- NO rechazamos a α = 0.01 ✗

**Propiedad 2: Relación entre p-valor y decisión**
```
H₀ es rechazada a nivel α si y solo si p-valor ≤ α
```

### 5.2 Trade-off entre Errores

Para un tamaño muestral fijo:
- ↓ α (más estricto) → ↑ β (menor potencia)
- ↑ α (menos estricto) → ↓ β (mayor potencia)

Solución: Aumentar n para reducir ambos errores simultáneamente.

## 6. Herramientas de Visualización

La metodología incluye cinco tipos de visualizaciones:

### 6.1 Gráfico de Distribuciones y Errores
- Muestra distribuciones bajo H₀ y H₁
- Identifica regiones de error tipo I (α) y tipo II (β)
- Ilustra el valor crítico y las zonas de decisión

### 6.2 Curva de Potencia
- Relación entre tamaño muestral y potencia
- Comparación entre diferentes niveles α
- Identificación del n necesario para alcanzar potencia objetivo

### 6.3 Visualización de P-valor
- Área bajo la curva que representa el p-valor
- Comparación con el nivel de significación
- Interpretación gráfica de la evidencia

### 6.4 Comparación de Trade-offs
- Gráfico de barras comparando α, β y potencia
- Análisis de sensibilidad según nivel de significación
- Visualización del equilibrio entre tipos de error

### 6.5 Simulación de P-valores
- Distribución de p-valores bajo H₀ (uniforme)
- Identificación de tasa de falsos positivos esperada
- Validación de propiedades teóricas

## 7. Ejemplos de Aplicación

### 7.1 Caso 1: Prueba de Media con n = 50

**Contexto:** Evaluación de altura promedio

**Datos:**
- H₀: μ = 170 cm
- H₁: μ ≠ 170 cm
- n = 50, x̄ = 172.5 cm, s = 8.2 cm

**Análisis:**
```
t = (172.5 - 170)/(8.2/√50) = 2.156
gl = 49
p-valor = 0.036
IC 95%: [170.2, 174.8]
d de Cohen = 2.5/8.2 = 0.30 (efecto pequeño-medio)
```

**Interpretación:**
Al nivel del 5%, se rechaza H₀ (p = 0.036 < 0.05). Existe evidencia significativa de que la altura media difiere de 170 cm. Sin embargo, al nivel del 1% no se rechazaría (p > 0.01). El tamaño del efecto es pequeño a medio.

### 7.2 Caso 2: Análisis de Potencia

**Pregunta:** ¿Cuántos participantes necesito para detectar una diferencia de 5 unidades con potencia del 80%?

**Parámetros:**
- δ = 5 (diferencia mínima relevante)
- σ = 10 (desviación estándar estimada)
- α = 0.05 (bilateral)
- 1-β = 0.80 (potencia deseada)

**Cálculo:**
```
d = δ/σ = 5/10 = 0.5 (efecto medio)
z_α/2 = 1.96, z_β = 0.84
n ≈ 2(1.96 + 0.84)² / 0.5² = 63 por grupo
```

**Conclusión:** Se necesitan aproximadamente 63 participantes por grupo.

### 7.3 Caso 3: Interpretación de Resultados Múltiples

**Escenario:** Un estudio reporta múltiples contrastes con diferentes p-valores.

| Contraste | P-valor | Decisión α=0.05 | Decisión α=0.01 |
|-----------|---------|-----------------|-----------------|
| A | 0.003 | Rechazar ✓ | Rechazar ✓ |
| B | 0.025 | Rechazar ✓ | No rechazar ✗ |
| C | 0.068 | No rechazar ✗ | No rechazar ✗ |

**Interpretación:**
- Contraste A: Evidencia fuerte (significativo incluso a nivel estricto)
- Contraste B: Evidencia moderada (0.01 < p < 0.05)
- Contraste C: Evidencia débil (p > 0.05)

## 8. Recomendaciones Metodológicas

### 8.1 Diseño del Estudio
1. Realizar análisis de potencia a priori
2. Pre-registrar hipótesis y análisis
3. Establecer α antes de ver los datos
4. Considerar correcciones por comparaciones múltiples si aplica

### 8.2 Análisis de Datos
5. Verificar supuestos antes de aplicar pruebas
6. Reportar p-valores exactos, no solo "p < 0.05"
7. Incluir intervalos de confianza
8. Calcular y reportar tamaños del efecto

### 8.3 Interpretación
9. No interpretar "no significativo" como "no hay efecto"
10. Considerar la relevancia práctica además de la significación
11. Evaluar la potencia cuando no se rechaza H₀
12. Discutir limitaciones y validez del estudio

### 8.4 Reporte
13. Usar lenguaje preciso (evitar "aceptar" H₀)
14. Proporcionar información completa del contraste
15. Incluir visualizaciones cuando sea apropiado
16. Facilitar la replicabilidad del análisis

## 9. Recursos Complementarios

### 9.1 Software Recomendado
- **R**: Análisis estadístico completo (función `power.t.test()`)
- **Python**: Librerías `scipy.stats`, `statsmodels`
- **G*Power**: Software especializado en análisis de potencia
- **SPSS, SAS, Stata**: Paquetes estadísticos comerciales

### 9.2 Paquetes R Útiles
```r
library(pwr)        # Análisis de potencia
library(effectsize) # Cálculo de tamaños del efecto
library(broom)      # Resultados en formato tidy
library(ggplot2)    # Visualizaciones
```

### 9.3 Plantilla de Análisis en R
```r
# Análisis de potencia a priori
pwr.t.test(d = 0.5, sig.level = 0.05, power = 0.80, type = "two.sample")

# Prueba t
resultado <- t.test(x, mu = mu0, alternative = "two.sided")

# Intervalo de confianza
confint(resultado)

# Tamaño del efecto
cohens_d(x, mu = mu0)

# Potencia post hoc
pwr.t.test(n = length(x), d = observado_d, sig.level = 0.05)
```

## 10. Conclusiones

Esta metodología proporciona:

1. **Marco sistemático** para la planificación, ejecución e interpretación de contrastes de hipótesis
2. **Corrección de errores conceptuales** comunes que pueden llevar a interpretaciones erróneas
3. **Herramientas visuales** para facilitar la comprensión de conceptos abstractos
4. **Ejemplos prácticos** que ilustran la aplicación de los principios
5. **Recomendaciones** basadas en las mejores prácticas estadísticas actuales

La implementación rigurosa de esta metodología permite:
- Tomar decisiones fundamentadas basadas en evidencia
- Minimizar errores de inferencia
- Maximizar el valor informativo de los estudios
- Facilitar la replicabilidad de la investigación
- Mejorar la comunicación de resultados estadísticos

## Referencias Clave

1. **Neyman, J., & Pearson, E. S. (1933).** On the Problem of the Most Efficient Tests of Statistical Hypotheses. *Philosophical Transactions of the Royal Society A*, 231, 289-337.

2. **Fisher, R. A. (1925).** *Statistical Methods for Research Workers*. Oliver and Boyd.

3. **Cohen, J. (1988).** *Statistical Power Analysis for the Behavioral Sciences* (2nd ed.). Lawrence Erlbaum Associates.

4. **Casella, G., & Berger, R. L. (2002).** *Statistical Inference* (2nd ed.). Duxbury Press.

5. **American Statistical Association. (2016).** Statement on Statistical Significance and P-Values. *The American Statistician*, 70(2), 131-133.

6. **Wasserstein, R. L., Schirm, A. L., & Lazar, N. A. (2019).** Moving to a World Beyond "p < 0.05". *The American Statistician*, 73(sup1), 1-19.

---

**Documento metodológico desarrollado para fines académicos y de investigación**
