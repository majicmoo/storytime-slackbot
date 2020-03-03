package story

class Narrator(val story: Story) {
  private val currentNode = story.startNode
  def start(): String = story.startNode.statement

  def input(response: String): String =
    response match {
      case "help" => "You need help?"
      case _      => "I don't understand"
    }

}
