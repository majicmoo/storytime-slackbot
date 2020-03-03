package story

case class StoryNode(statement: String)

case class Story(name: String, startNode: StoryNode) 