package story

object TestData {
    val lookArm = DeathNode("Its bleeding... badly. Its not looking good.")
    val arm = NounAndActions("arm", look = Some(lookArm))
    val touchBook = NormalNode("The book bites you. Your arm is now bleeding.", List(arm))

    val smellBook = DeathNode(
        "The book sniffs you back. You step back in shock and fall down some conveniently placed stairs."
    )
    val book = NounAndActions("book", touch = Some(touchBook), smell = Some(smellBook))

    val touchFork = NormalNode("Its pointy.", List(book))
    val tasteFork = WinNode("You found the magic fork! And ate it! You are now a cutlery wizard.")
    val fork = NounAndActions("fork", touch = Some(touchFork), taste = Some(tasteFork))
    val story = Story("A Story", NormalNode("Hello there", List(book, fork)))
}
