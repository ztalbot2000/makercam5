//O public class Individual
export class Individual
{

   //O public var fitness:Number = NaN;
   fitness:number = NaN;

   // secondary fitness is used as a "tiebreaker" in the event that fitness is equal
   // this is important as we use rank based selection
   //O public var secondaryfitness:Number = NaN;
   secondaryfitness: number = NaN;

   // the gene of the individual is an array of integers, each representing the index value of the nesting order
   //O public var genes:Array;
   genes: Array<number> = [];

   // whereas the genes array stores the insertion order, the data array stores the exact placements of each bitmap
   //public var data:Array;
   data: Array<number> = [];


   //O public function Individual():void
   constructor()
   {

   }

   // mutates each chromasome of the gene according to the given probability p (percent)
   // returns the number of mutations
   //O public function mutate(p:Number):int
   public mutate( p: number ): number
   {
      //O if (!genes)
      if ( ! this.genes )
      {
         //O return 0;
         return 0;
      }

      //O var mutations:int = 0;
      let mutations: number = 0;

      //O for(var i:int=0; i<genes.length; i++)
      for( let i=0; i<this.genes.length; i++ )
      {
         //O var rand:Number = Math.random()*100;
         let rand: number = Math.random()*100;
         if ( rand < p )
         {
            //O mutations++;
            mutations++;
            // swap current chromasome with another
            //O var j:int = i;
            let j: number = i;
            while( j==i )
            {
               //O j = Math.round(Math.random()*(genes.length-1));
               j = Math.round(Math.random()*(this.genes.length-1));
            }
            //O var temp:int = genes[i];
            let temp: number = this.genes[i];
            //O genes[i] = genes[j];
            this.genes[i] = this.genes[j];
            //O genes[j] = temp;
            this.genes[j] = temp;
         }
      }

      //O return mutations;
      return mutations;
   }

   // returns a clone of this individual
   //O public function clone():Individual
   public clone(): Individual
   {
      //O var clone:Individual = new Individual();
      let clone: Individual = new Individual();
      //O clone.fitness = this.fitness;
      clone.fitness = this.fitness;
      //O clone.genes = this.genes.slice();
      clone.genes = this.genes.slice();

      //O return clone;
      return clone;
   }

   // two point crossover with the given mate individual, return the resulting child
   /* Originally commented out
//O   public function mate(mate:Individual):Array{
//O   var cutpoint1:int = Math.round(Math.random()*(genes.length-1));
//O   var cutpoint2:int = cutpoint1;
//O
//O   // we want at least 25% of the gene to remain stable
//O   while(Math.abs(cutpoint1 - cutpoint2) < genes.length/4){
//O      cutpoint2 = Math.round(Math.random()*(genes.length-1));
//O   }
//O
//O   if(cutpoint1 > cutpoint2){
//O      var temp:int = cutpoint1;
//O      cutpoint1 = cutpoint2;
//O      cutpoint2 = temp;
//O   }
//O
//O   var gene1:Array = genes.slice(cutpoint1,cutpoint2);
//O   var gene2:Array = mate.genes.slice(cutpoint1,cutpoint2);
//O
//O   var i:int = 0;
//O   var j:int = 0;
//O   while(j < cutpoint1){
//O      if(gene1.indexOf(mate.genes[i]) == -1){
//O         gene1.unshift(mate.genes[i]);
//O         j++;
//O      }
//O      i++;
//O   }
//O
//O   while(i < genes.length){
//O      if(gene1.indexOf(mate.genes[i]) == -1){
//O         gene1.push(mate.genes[i]);
//O      }
//O      i++;
//O   }
//O
//O   i = 0;
//O   j = 0;
//O   while(j < cutpoint1){
//O      if(gene2.indexOf(genes[i]) == -1){
//O         gene2.unshift(genes[i]);
//O         j++;
//O      }
//O      i++;
//O   }
//O
//O   while(i < genes.length){
//O      if(gene2.indexOf(genes[i]) == -1){
//O         gene2.push(genes[i]);
//O      }
//O      i++;
//O   }
//O
//O   var child1:Individual = new Individual();
//O   child1.genes = gene1;
//O
//O   var child2:Individual = new Individual();
//O   child2.genes = gene2;
//O
//O   return new Array(child1, child2);
// }
   */

   // single point crossover
   //O public function mate(mate:Individual):Array
   public mate(mate: Individual): Array<Individual>
   {
      //O var cutpoint:int = Math.round(Math.random()*((genes.length-1)*0.90));
      let cutpoint: number = Math.round(Math.random()*((this.genes.length-1)*0.90));

      //O var gene1:Array = genes.slice(0,cutpoint);
      let gene1: Array<number> = this.genes.slice(0,cutpoint);
      //O var gene2:Array = mate.genes.slice(0,cutpoint);
      let gene2: Array<number> = mate.genes.slice(0,cutpoint);

      //O var i:int = 0;
      let i: number = 0;

      //O while( i < genes.length )
      while( i < this.genes.length )
      {
         //O if (gene1.indexOf(mate.genes[i]) == -1)
         if (gene1.indexOf(mate.genes[i]) == -1)
         {
            //O gene1.push(mate.genes[i]);
            gene1.push(mate.genes[i]);
         }
         //O i++;
         i++;
      }

      //O i = 0;
      while( i < this.genes.length )
      {
         //O if( gene2.indexOf(genes[i]) == -1 )
         if( gene2.indexOf(this.genes[i]) == -1 )
         {
            //O gene2.push(genes[i]);
            gene2.push(this.genes[i]);
         }
         //O i++;
         i++;
      }

      //O var child1:Individual = new Individual();
      let child1: Individual = new Individual();
      //O child1.genes = gene1;
      child1.genes = gene1;

      //O var child2:Individual = new Individual();
      let child2: Individual = new Individual();
      //O child2.genes = gene2;
      child2.genes = gene2;

      //O return new Array(child1, child2);
      return new Array(child1, child2);
   }
}
