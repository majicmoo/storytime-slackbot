package story

import org.scalatest._
import TestData._

class NarratorSpec extends FlatSpec with Matchers {
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

  "progressing the story" should "continue to next node" in {
    val narrator = new Narrator(story)
    narrator.input("touch book") shouldEqual "The book bites you. Your arm is now bleeding."
    narrator.input("look at arm") shouldEqual "Its bleeding... badly. Its not looking good. You died! x_x"
  }

  "could you repeat" should "repeat current statement" in {
    new Narrator(story).input("could you repeat?") shouldEqual "Hello there"
    new Narrator(story).input("something could you repeat? something") shouldEqual "Hello there"
  }

  "after death story" should "reset" in {
    val narrator = new Narrator(story)
    narrator.input("touch book")
    narrator.input("could you repeat?") shouldEqual "The book bites you. Your arm is now bleeding."
    narrator.input("look at arm")
    narrator.input("could you repeat?") shouldEqual "Hello there"
  }

  "look around" should "provide some information about the current state" in {
    val narrator = new Narrator(story)
    narrator.input("look around") shouldEqual "You can see a book and a fork."
    narrator.input("touch book")
    narrator.input("look around") shouldEqual "You can see an arm."
  }

}
