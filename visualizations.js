// Configuración de Chart.js
Chart.defaults.font.family = "'Georgia', serif";
Chart.defaults.font.size = 12;

// Actualizar fecha
document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Función para generar distribución normal
function normalDistribution(x, mean, stdDev) {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

// Función para generar datos de distribución normal
function generateNormalData(mean, stdDev, start, end, points = 200) {
    const data = [];
    const step = (end - start) / points;
    for (let x = start; x <= end; x += step) {
        data.push({ x: x, y: normalDistribution(x, mean, stdDev) });
    }
    return data;
}

// 1. Gráfico de Distribución de Errores Tipo I y Tipo II
const errorDistCtx = document.getElementById('errorDistributionChart');
if (errorDistCtx) {
    const alpha = 0.05;
    const mean0 = 0;
    const mean1 = 3;
    const stdDev = 1;

    // Calcular valor crítico
    const criticalValue = 1.645; // Para alpha = 0.05 (una cola)

    // Generar datos para H0
    const h0Data = generateNormalData(mean0, stdDev, -4, 6);

    // Generar datos para H1
    const h1Data = generateNormalData(mean1, stdDev, -4, 6);

    // Datos para región de rechazo (Error Tipo I)
    const alphaRegion = h0Data.filter(point => point.x >= criticalValue);

    // Datos para Error Tipo II
    const betaRegion = h1Data.filter(point => point.x <= criticalValue);

    new Chart(errorDistCtx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Distribución bajo H₀',
                    data: h0Data,
                    borderColor: 'rgb(59, 89, 152)',
                    backgroundColor: 'rgba(59, 89, 152, 0.1)',
                    fill: false,
                    pointRadius: 0,
                    borderWidth: 2
                },
                {
                    label: 'Distribución bajo H₁',
                    data: h1Data,
                    borderColor: 'rgb(46, 125, 50)',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    fill: false,
                    pointRadius: 0,
                    borderWidth: 2
                },
                {
                    label: 'Error Tipo I (α = 0.05)',
                    data: alphaRegion,
                    borderColor: 'rgb(198, 40, 40)',
                    backgroundColor: 'rgba(198, 40, 40, 0.3)',
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 0
                },
                {
                    label: 'Error Tipo II (β)',
                    data: betaRegion,
                    borderColor: 'rgb(255, 152, 0)',
                    backgroundColor: 'rgba(255, 152, 0, 0.3)',
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuciones bajo H₀ y H₁: Errores Tipo I y Tipo II',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            xMin: criticalValue,
                            xMax: criticalValue,
                            borderColor: 'rgb(0, 0, 0)',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: 'Valor crítico',
                                enabled: true,
                                position: 'top'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Estadístico de prueba'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Densidad de probabilidad'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// 2. Gráfico de Potencia vs Tamaño Muestral
const powerCtx = document.getElementById('powerAnalysisChart');
if (powerCtx) {
    const sampleSizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200];

    // Función simplificada para calcular potencia
    function calculatePower(n, effectSize, alpha) {
        // Aproximación usando la distribución normal
        const z_alpha = 1.96; // para alpha = 0.05 bilateral
        const z_beta = (effectSize * Math.sqrt(n)) - z_alpha;

        // Aproximación de la función de distribución acumulativa normal
        const power = 1 - (1 / (1 + Math.exp(1.702 * z_beta)));
        return Math.max(0, Math.min(1, power));
    }

    const effectSize = 0.5; // Tamaño del efecto medio

    const power005 = sampleSizes.map(n => calculatePower(n, effectSize, 0.05));
    const power001 = sampleSizes.map(n => calculatePower(n, effectSize, 0.01));
    const power010 = sampleSizes.map(n => calculatePower(n, effectSize, 0.10));

    new Chart(powerCtx, {
        type: 'line',
        data: {
            labels: sampleSizes,
            datasets: [
                {
                    label: 'α = 0.05',
                    data: power005,
                    borderColor: 'rgb(59, 89, 152)',
                    backgroundColor: 'rgba(59, 89, 152, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'α = 0.01',
                    data: power001,
                    borderColor: 'rgb(198, 40, 40)',
                    backgroundColor: 'rgba(198, 40, 40, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: 'α = 0.10',
                    data: power010,
                    borderColor: 'rgb(46, 125, 50)',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                title: {
                    display: true,
                    text: 'Potencia Estadística en función del Tamaño Muestral (d = 0.5)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tamaño muestral (n)'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Potencia (1 - β)'
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// 3. Gráfico de P-valor
const pValueCtx = document.getElementById('pValueChart');
if (pValueCtx) {
    const mean = 0;
    const stdDev = 1;
    const observedValue = 2.1;

    const distributionData = generateNormalData(mean, stdDev, -4, 4);
    const pValueRegionRight = distributionData.filter(point => point.x >= observedValue);
    const pValueRegionLeft = distributionData.filter(point => point.x <= -observedValue);

    new Chart(pValueCtx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Distribución bajo H₀',
                    data: distributionData,
                    borderColor: 'rgb(59, 89, 152)',
                    backgroundColor: 'rgba(59, 89, 152, 0.1)',
                    fill: false,
                    pointRadius: 0,
                    borderWidth: 2
                },
                {
                    label: 'P-valor (cola derecha)',
                    data: pValueRegionRight,
                    borderColor: 'rgb(198, 40, 40)',
                    backgroundColor: 'rgba(198, 40, 40, 0.4)',
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 0
                },
                {
                    label: 'P-valor (cola izquierda)',
                    data: pValueRegionLeft,
                    borderColor: 'rgb(198, 40, 40)',
                    backgroundColor: 'rgba(198, 40, 40, 0.4)',
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución del Estadístico e Interpretación del P-valor (Prueba Bilateral)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                subtitle: {
                    display: true,
                    text: 'Valor observado: 2.1 | P-valor ≈ 0.036',
                    font: { size: 12 }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Estadístico de prueba'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Densidad de probabilidad'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// 4. Comparación de Niveles de Significación
const sigLevelsCtx = document.getElementById('significanceLevelsChart');
if (sigLevelsCtx) {
    new Chart(sigLevelsCtx, {
        type: 'bar',
        data: {
            labels: ['α = 0.01', 'α = 0.05', 'α = 0.10'],
            datasets: [
                {
                    label: 'Error Tipo I (α)',
                    data: [0.01, 0.05, 0.10],
                    backgroundColor: 'rgba(198, 40, 40, 0.7)',
                    borderColor: 'rgb(198, 40, 40)',
                    borderWidth: 2
                },
                {
                    label: 'Potencia (1 - β)',
                    data: [0.52, 0.70, 0.82],
                    backgroundColor: 'rgba(46, 125, 50, 0.7)',
                    borderColor: 'rgb(46, 125, 50)',
                    borderWidth: 2
                },
                {
                    label: 'Error Tipo II (β)',
                    data: [0.48, 0.30, 0.18],
                    backgroundColor: 'rgba(255, 152, 0, 0.7)',
                    borderColor: 'rgb(255, 152, 0)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación de Errores y Potencia según Nivel de Significación (n=50, d=0.5)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Nivel de significación'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Probabilidad'
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                }
            }
        }
    });
}

// 5. Simulación de distribución de p-valores
const simulationCtx = document.getElementById('simulationChart');
if (simulationCtx) {
    // Simular 1000 p-valores bajo H0
    const numSimulations = 1000;
    const pValues = [];

    // Generar p-valores uniformes (como deberían ser bajo H0)
    for (let i = 0; i < numSimulations; i++) {
        pValues.push(Math.random());
    }

    // Crear histograma
    const bins = 20;
    const binSize = 1.0 / bins;
    const histogram = new Array(bins).fill(0);

    pValues.forEach(p => {
        const binIndex = Math.min(Math.floor(p / binSize), bins - 1);
        histogram[binIndex]++;
    });

    // Crear etiquetas para los bins
    const labels = [];
    for (let i = 0; i < bins; i++) {
        labels.push((i * binSize).toFixed(2) + '-' + ((i + 1) * binSize).toFixed(2));
    }

    // Contar cuántos p-valores están por debajo de 0.05
    const significantCount = pValues.filter(p => p <= 0.05).length;
    const significantPercentage = ((significantCount / numSimulations) * 100).toFixed(1);

    new Chart(simulationCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frecuencia de p-valores',
                data: histogram,
                backgroundColor: histogram.map((_, i) =>
                    (i * binSize) <= 0.05 ? 'rgba(198, 40, 40, 0.7)' : 'rgba(59, 89, 152, 0.7)'
                ),
                borderColor: histogram.map((_, i) =>
                    (i * binSize) <= 0.05 ? 'rgb(198, 40, 40)' : 'rgb(59, 89, 152)'
                ),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución de 1000 P-valores bajo H₀ (α = 0.05)',
                    font: { size: 16, weight: 'bold' }
                },
                subtitle: {
                    display: true,
                    text: `P-valores < 0.05: ${significantCount} (${significantPercentage}%) - Esperado: ~50 (5%)`,
                    font: { size: 12 },
                    color: 'rgb(198, 40, 40)'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Rango de p-valor'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Frecuencia'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar fijo al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 150) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
});
