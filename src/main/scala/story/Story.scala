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

case class StoryNode(
    statement: String,
    stuffToDo: List[NounAndActions] = Nil
)

case class Story(name: String, startNode: StoryNode)
