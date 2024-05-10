info.onCountdownEnd(function () {
    game.gameOver(true)
    game.setGameOverScoringType(game.ScoringType.HighScore)
})
function moveMoleToHole (mySprite: Sprite, num: number) {
    newHoleIndex = num - 1
    if (currentHoleIndex == newHoleIndex) {
        moveMoleToHole(mySprite, randint(1, 9))
    } else {
        holeX = newHoleIndex % 3
        holeY = Math.floor(newHoleIndex / 3)
        mySprite.setPosition(29 + 50 * holeX, 21 + 32 * holeY)
        currentHoleIndex = num
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    animation.runImageAnimation(
    sprite,
    assets.animation`hammerAnimation`,
    50,
    false
    )
    animation.runImageAnimation(
    otherSprite,
    assets.animation`moleAnimation`,
    100,
    false
    )
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    info.changeScoreBy(1)
    moveMoleToHole(otherSprite, randint(1, 9))
})
let holeY = 0
let holeX = 0
let newHoleIndex = 0
let currentHoleIndex = 0
game.showLongText("Move your hammer using the control keys to hit the mole as many times as possible before your time runs out.", DialogLayout.Center)
scene.setBackgroundImage(assets.image`holes`)
carnival.addLabelTo("Whack A Mole", carnival.Areas.Bottom)
let myMole = sprites.create(assets.image`mole`, SpriteKind.Enemy)
let myHammer = sprites.create(assets.image`hammer`, SpriteKind.Player)
controller.moveSprite(myHammer)
myHammer.setStayInScreen(true)
currentHoleIndex = randint(1, 9)
moveMoleToHole(myMole, currentHoleIndex)
info.setScore(0)
info.startCountdown(15)
