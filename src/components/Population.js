import DNK from './DNA';
import util from './Util';

class Population {
    constructor(t, m, populationSize) {
        this.target = t;
        this.mutationRate = m;
        this.generations = 0;
        this.perfectScore = 1;
        this.finished = false;
        this.matingPool = [];
        this.best = '';

        this.population = Array(populationSize).fill(null);
        this.population = this.population.map(() => new DNK(this.target.length));

        this.calcPopulationFitness();
    }

    calcPopulationFitness() {
        this.population.forEach(member => {
            member.calcFitness(this.target);
        });
    }

    naturalSelection() {
        let maxFitness = 0;
    
        this.matingPool = [];

        this.population.forEach(member => {
            maxFitness = member.fitness > maxFitness ? member.fitness : maxFitness;
        });

        this.population.forEach(member => {
            const fitness = util.map(member.fitness, 0, maxFitness, 0, 1);
            
            let n = Math.floor(fitness * 50);
            for ( ; n >= 0; n--) {
                this.matingPool.push(member);
            }
        });
    }

    generate() {

        this.population.forEach((member, i) => {
            const a = util.randomInt(0, this.matingPool.length - 1);
            const b = util.randomInt(0, this.matingPool.length - 1);

            const partnerA = this.matingPool[a];
            const partnerB = this.matingPool[b];

            const child = partnerA.crossover(partnerB);

            child.mutate(this.mutationRate);

            this.population[i] = child;

        });

        this.generations += 1;
    }


    getBest() {
        return this.best;
    }

    evaluate() {
        let worldrecord = 0.0;
        let index = 0;

        this.population.forEach((member, i) => {
            if (member.fitness > worldrecord) {
                index = i;
                worldrecord = member.fitness;
            }
        });

        this.best = this.population[index].getPhrase();

        if (worldrecord === this.perfectScore) this.finished = true;
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    getAverageFitness() {
        let total = 0;

        this.population.forEach(member => {
            total += member.fitness;
        });

        return total / this.population.length;
    }
}

export default Population;