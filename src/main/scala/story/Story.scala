package story

object Verbs extends Enumeration {
  type Verb = Value
  val taste, touch, smell, look, listen = Value
}

case class NounAndActions(
    item: String,
    taste: Option[StoryNode] = None,
    touch: Option[StoryNode] = None,
    smell: Option[StoryNode] = None,
    look: Option[StoryNode] = None,
    listen: Option[StoryNode] = None
)

sealed class StoryNode(val statement: String)

case class DeathNode(override val statement: String)
    extends StoryNode(statement)
case class WinNode(override val statement: String) extends StoryNode(statement)
case class NormalNode(
    override val statement: String,
    stuffToDo: List[NounAndActions] = Nil
) extends StoryNode(statement)

case class Story(name: String, startNode: NormalNode)
