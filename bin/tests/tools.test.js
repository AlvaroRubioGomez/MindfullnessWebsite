const tools = require('../../public/javascripts/tools');

/*shuffleArray unit test*/
describe('SuffleArray function', () => {
  it('Shuffle an array. E.g being [1,2,3,4,5,6,7,8,9,10,11,12,13,14] returns a shuffled array of length 14', () => {
    //Shuffled array
    let testArray = tools.shuffleArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);

    //Select two random elements
    //let pos1 = Math.floor(Math.random() * 14);
    //let pos2 = Math.floor(Math.random() * 14);

    expect(testArray).toHaveLength(14);  
    //Element should not be equal to its position number + 1  
    //expect(testArray[pos1]).not.toBe(pos1 + 1);
    //expect(testArray[pos2]).not.toBe(pos2 + 1);
  }); 
});

/*questionTracker unit test*/
describe('questionTracker function', () => {
  it('Return first element of an array and the modified array after removing the first element', () =>{
    let arrayEg = [1,2,3]; 
    let id;
    
    [id, arrayEg] = tools.questionTracker(arrayEg);
    expect(id).toBe(1);
    expect(arrayEg).toStrictEqual([2,3]);    

    [id, arrayEg] = tools.questionTracker(arrayEg);
    expect(id).toBe(2);
    expect(arrayEg).toStrictEqual([3]);
   
  });
});

/*getFormattedDate unit test*/
describe('getFormattedDate function', () => {
  it(`Gets today's date with the format DD/MM/YYYY`, () =>{
    let today = tools.getFormattedDate();
    expect(today).toBe('22/02/2021'); //Expected value to be changed
  });
});

/*FormattedTime function*/
describe('FormattedTime function', () => {
  it('Convert passed time in seconds to HH:MM:SS format or MM:SS format if time less than an hour', () =>{
    let moreThanAnHour = 8500;
    let lessThanAnHour = 2150;
    let singleDigitTime = 125;
    
    expect(tools.FormattedTime(moreThanAnHour)).toBe('2:21:40'); 
    expect(tools.FormattedTime(lessThanAnHour)).toBe('35:50');
    expect(tools.FormattedTime(singleDigitTime)).toBe('02:05');

  });
});









