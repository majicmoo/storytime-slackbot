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

sealed trait StoryNode

case class DeathNode(val statement: String) extends StoryNode
case class WinNode(val statement: String) extends StoryNode
case class NormalNode(val statement: String, stuffToDo: List[NounAndActions] = Nil) extends StoryNode

case class Story(title: String, startNode: NormalNode)
