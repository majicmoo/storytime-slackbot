package story

import org.scalatest._

class NarratorSpec extends FlatSpec with Matchers {
  val book =
    NounAndActions(
      "book",
      touch = Some(StoryNode("The book bites you.")),
      smell = Some(StoryNode("The book sniffs you back."))
    )
  val story = Story("A Story", StoryNode("Hello there", List(book)))

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
    new Narrator(story).input("touch book") shouldEqual "The book bites you."
  }

  "smelling an existing thing" should "progress story" in {
    new Narrator(story)
      .input("smell book") shouldEqual "The book sniffs you back."
  }

  "doing something unexpected to an existing thing" should "question you" in {
    new Narrator(story)
      .input("taste book") shouldEqual "What do you think you are doing?"
  }
}
