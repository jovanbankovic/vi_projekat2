import React, { useEffect, useState } from 'react';
import Population from './Population';
import { target, mutation, populationSize } from './common/Settings';

const App = () =>
{
    var settings = { target: target, mutation: mutation, populationSize: populationSize }

    const [result, setResult] = useState(''); //result hook
    let isRunning = true;

    var population = new Population(settings.target, settings.mutation, settings.populationSize);

    const run = () =>
    {
        population.naturalSelection();
        population.generate();
        population.calcPopulationFitness();
        population.evaluate();

        if (population.isFinished()) {
            isRunning = false;
        }

        setResult(population.getBest());

        if (isRunning) { 
            window.requestAnimationFrame(run);
        }
    }

    useEffect(() => {
        run();
    }, [])

    return (
        <div className="result">
            { result }
        </div>
    );
}

export default App;