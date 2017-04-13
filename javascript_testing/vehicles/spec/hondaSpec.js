describe('Honda constructor', function() {
  it('inherits the Vehicle prototype', function() {
    var honda = new Honda('Civic');
    expect(honda.toString()).toEqual('Honda Civic');
  });
  
  it('sets the model property when a valid model is passed in', function() {
    var honda = new Honda('Civic');
    expect(honda.model).toEqual('Civic');
  });

  it('throws an eror if an invalid model is passed in', function() {
    var makeInvalidCar = function() {
      new Honda('Prelude');
    };

    expect(makeInvalidCar).toThrow('Model Prelude does not exist.');
  });

  it('returns a list of valid models', function() {
    expect(Honda.getModels().length).toBeDefined();
    expect(Honda.getModels()).toContain('Civic');
  });
  
  it('calls getPrice when a new car is created', function() {
    spyOn(Honda, 'getPrice');
    var car = new Honda('Civic');

    expect(Honda.getPrice).toHaveBeenCalled();
    expect(Honda.getPrice).toHaveBeenCalledWith('Civic');
  });

  it('returns a price for the passed in model', function() {
    expect(Honda.getPrice('Civic')).toBeGreaterThan(0);
  });

  it('returns a price less than 15000 when a Civic is created', function() {
    var car = new Honda('Civic');

    expect(car.price).toBeLessThan(15000);
  });
  
  it('returns a price greater than 10000 when a CR-Z is created', function() {
    var car = new Honda('CR-Z');

    expect(car.price).toBeGreaterThan(10000);
  });
});
