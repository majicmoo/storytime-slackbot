package story

import org.scalatest._

class NarratorSpec extends FlatSpec with Matchers {
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

  "start" should "begin story" in {
    new Narrator(story).start() shouldEqual "Hello there"
  }

  "inputting nonsense" should "get default reply" in {
    new Narrator(story).input("nonsense") shouldEqual "I don't understand"
  }

  "asking for help" should "get some help" in {
    new Narrator(story).input("help") shouldEqual "You need help?"
  }

  "touching an existing thing" should "progress story" in {
    new Narrator(story).input("touch book") shouldEqual "The book bites you. Your arm is now bleeding."
    new Narrator(story).input("touch fork") shouldEqual "Its pointy."
  }

  "progressing the story" should "handle death" in {
    new Narrator(story)
      .input("smell book") shouldEqual "The book sniffs you back. You step back in shock and fall down some conveniently placed stairs. You died! x_x"
  }

  "progressing the story" should "handle win" in {
    new Narrator(story)
      .input("taste fork") shouldEqual "You found the magic fork! And ate it! You are now a cutlery wizard. You won! °˖✧◝(⁰▿⁰)◜✧˖°"
  }

  "doing something unexpected to an existing thing" should "question you" in {
    new Narrator(story).input("taste book") shouldEqual "You can't do that to a book."
  }

  "doing something expected an non existent thing" should "question you" in {
    new Narrator(story).input("look at cat") shouldEqual "I don't understand"
  }

}
