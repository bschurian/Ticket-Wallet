const PHI = ((1+Math.sqrt(5))/2);
const fibonacci = function(n){
	return Math.round((Math.pow(PHI,n)-Math.pow(1-PHI,n))/Math.sqrt(5));
}

export default fibonacci;