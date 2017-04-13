describe('Vehicle constructor', function() {
  beforeEach(function() {
    this.car = new Vehicle({
      make: 'Honda',
      model: 'Civic'
    });
  });

  it('sets the make and model properties when an object is passed in', function() {
    expect(this.car.make).toEqual('Honda');
    expect(this.car.model).toEqual('Civic');
  });

  it('returns a concatenated string with make and model', function() {
    expect(this.car.toString()).toEqual('Honda Civic');
    this.car.model = 'Accord';
    expect(this.car.toString()).toEqual('Honda Accord');
  });

  it('returns a message when the horn is honked', function() {
    expect(this.car.honkHorn()).toMatch(/beep/);
  });
});