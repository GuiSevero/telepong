
describe('Game', function(){
    var game

    beforeEach(function () {
        game = new Telepong.Game
        spyOn(game, 'step').andCallThrough()
    })

    afterEach(function () {
        this.removeAllSpies()
        delete game.step
    })

    // TESTS

    it('start stopped', function(){
        expect(game.running).toBeFalsy()
    })

    it('should run', function(){
        game.run()
        expect(game.running).toBeTruthy()
    })

    it('should pause', function(){
        game.pause()
        expect(game.running).toBeFalsy()
    })

    it('should pause after run', function(){
        game.run()
        game.pause()
        expect(game.running).toBeFalsy()
    })

    it('running state should call the step function', function () {
        game.run()

        waitsFor(function(){
            return game.step.wasCalled
        }, 'game.step() should have been called')
    })

    it('running state should call the step function repeatedly', function () {
        game.run()

        waitsFor(function(){
            return game.step.callCount > 1
        }, 'game.step() should have been called twice')
    })

    it('running state should call the step function repeatedly', function () {
        game.run()

        waitsFor(function(){
            return game.step.callCount > 1
        }, 'game.step() should have been called twice')
    })

    it('paused state cant call step at least in one second', function () {
        var steps = 0
          , callCount

        game.run()
        game.pause()
        callCount = game.step.callCount

        waitsFor(function () {
            return ++steps > (1000 / jasmine.WaitsForBlock.TIMEOUT_INCREMENT) 
                && game.step.callCount - 1 <= callCount
        }, 'game.step() should not have been called')
    })

})