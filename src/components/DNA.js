import util from './Util';

class DNA {
    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        
        this.genes = Array(num).fill(null);
        this.genes = this.genes.map(() => util.newChar());
    }

    getPhrase() {
        return this.genes.join('');
    }

    calcFitness(target) {
        let score = 0;

        this.genes.forEach((gene, i) => {
            if (gene === target.charAt(i)) score += 1;
        });

        this.fitness = score / target.length;
    }

    crossover(partner) {
        const child = new DNA(this.genes.length);
        const midpoint = util.randomInt(0, this.genes.length - 1);

        this.genes.forEach((gene, i) => {

            if (i > midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        });
        
        return child;
    }

    mutate(mutationRate) {
        this.genes.forEach((gene, i) => {

            if (Math.random(0, 1) < mutationRate) {
                this.genes[i] = util.newChar();
            }
        });
    }
}

export default DNA;