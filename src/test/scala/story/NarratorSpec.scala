package story

import org.scalatest._

class NarratorSpec extends FlatSpec with Matchers {
  val story = Story("A Story", StoryNode("Hello there"))
  "start" should "begin story" in {
    new Narrator(story).start() shouldEqual "Hello there"
  }

  "inputting nonsense" should "get default reply" in {
    new Narrator(story).input("nonsense") shouldEqual "I don't understand"
  }

  "asking for help" should "get some help" in {
    new Narrator(story).input("help") shouldEqual "You need help?"
  }
}
