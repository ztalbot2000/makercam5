//O public class Individual
export default class Individual
{

   //O public var fitness:Number = NaN;
   fitness = NaN;

   // secondary fitness is used as a "tiebreaker" in the event that fitness is equal
   // this is important as we use rank based selection
   //O public var secondaryfitness:Number = NaN;
   secondaryfitness = NaN;

   // the gene of the individual is an array of integers, each representing the index value of the nesting order
   //O public var genes:Array;
   genes = [];

   // whereas the genes array stores the insertion order, the data array stores the exact placements of each bitmap
   //public var data:Array;
   data = [];


   //O public function Individual():void
   constructor()
   {

   }

   // mutates each chromasome of the gene according to the given probability p (percent)
   // returns the number of mutations
   //O public function mutate(p:Number):int
   mutate(p)
   {
      if (!genes) {
         return 0;
      }

      //O var mutations:int = 0;
      var mutations = 0;

      //O for(var i:int=0; i<genes.length; i++)
      for(var i=0; i<genes.length; i++)
      {
         //O var rand:Number = Math.random()*100;
         var rand = Math.random()*100;
         if ( rand < p )
         {
            mutations++;
            // swap current chromasome with another
            //O var j:int = i;
            var j = i;
            while( j==i )
            {
               j = Math.round(Math.random()*(genes.length-1));
            }
            //O var temp:int = genes[i];
            var temp = genes[i];
            genes[i] = genes[j];
            genes[j] = temp;
         }
      }

      return mutations;
   }

   // returns a clone of this individual
   //O public function clone():Individual
   clone()
   {
      //O var clone:Individual = new Individual();
      var clone = new Individual();
      clone.fitness = this.fitness;
      clone.genes = this.genes.slice();

      return clone;
   }

   // two point crossover with the given mate individual, return the resulting child
   /*public function mate(mate:Individual):Array{
      var cutpoint1:int = Math.round(Math.random()*(genes.length-1));
      var cutpoint2:int = cutpoint1;

      // we want at least 25% of the gene to remain stable
      while(Math.abs(cutpoint1 - cutpoint2) < genes.length/4){
         cutpoint2 = Math.round(Math.random()*(genes.length-1));
      }

      if(cutpoint1 > cutpoint2){
         var temp:int = cutpoint1;
         cutpoint1 = cutpoint2;
         cutpoint2 = temp;
      }

      var gene1:Array = genes.slice(cutpoint1,cutpoint2);
      var gene2:Array = mate.genes.slice(cutpoint1,cutpoint2);

      var i:int = 0;
      var j:int = 0;
      while(j < cutpoint1){
         if(gene1.indexOf(mate.genes[i]) == -1){
            gene1.unshift(mate.genes[i]);
            j++;
         }
         i++;
      }

      while(i < genes.length){
         if(gene1.indexOf(mate.genes[i]) == -1){
            gene1.push(mate.genes[i]);
         }
         i++;
      }

      i = 0;
      j = 0;
      while(j < cutpoint1){
         if(gene2.indexOf(genes[i]) == -1){
            gene2.unshift(genes[i]);
            j++;
         }
         i++;
      }

      while(i < genes.length){
         if(gene2.indexOf(genes[i]) == -1){
            gene2.push(genes[i]);
         }
         i++;
      }

      var child1:Individual = new Individual();
      child1.genes = gene1;

      var child2:Individual = new Individual();
      child2.genes = gene2;

      return new Array(child1, child2);
   }*/

   // single point crossover
   //O public function mate(mate:Individual):Array
   mate(mate)
   {
      //O var cutpoint:int = Math.round(Math.random()*((genes.length-1)*0.90));
      var cutpoint = Math.round(Math.random()*((genes.length-1)*0.90));

      //O var gene1:Array = genes.slice(0,cutpoint);
      var gene1 = genes.slice(0,cutpoint);
      //O var gene2:Array = mate.genes.slice(0,cutpoint);
      var gene2 = mate.genes.slice(0,cutpoint);

      //O var i:int = 0;
      var i = 0;

      while( i < genes.length )
      {
         if (gene1.indexOf(mate.genes[i]) == -1)
         {
            gene1.push(mate.genes[i]);
         }
         i++;
      }

      i = 0;
      while( i < genes.length )
      {
         if( gene2.indexOf(genes[i]) == -1 )
         {
            gene2.push(genes[i]);
         }
         i++;
      }

      //O var child1:Individual = new Individual();
      var child1 = new Individual();
      child1.genes = gene1;

      //O var child2:Individual = new Individual();
      var child2 = new Individual();
      child2.genes = gene2;

      return new Array(child1, child2);
   }
}
