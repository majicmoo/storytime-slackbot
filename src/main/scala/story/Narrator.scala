package story

import Verbs._

class Narrator(val story: Story) {
  private var currentNode: NormalNode = story.startNode
  private val startNode: NormalNode = story.startNode

  def start(): String = story.startNode.statement

  def input(response: String): String = {
    val words = response.split(' ').toList

    val verbOpt = findVerb(words)
    val nounOpt = findNoun(words)

    (verbOpt, nounOpt) match {
      case (Some(verb), Some(noun)) => handleMatch(verb, noun)
      case _                        => handleNoMatches(response)
    }
  }

  private def handleMatch(verb: Verb, noun: NounAndActions): String = {
    val nextNodeOpt = verb match {
      case Verbs.taste  => noun.taste
      case Verbs.touch  => noun.touch
      case Verbs.smell  => noun.smell
      case Verbs.look   => noun.look
      case Verbs.listen => noun.listen
    }

    nextNodeOpt
      .map(handleStoryNodes(_))
      .getOrElse(s"You can't do that to ${aOrAn(noun.item)} ${noun.item}.")
  }

  private def handleStoryNodes(node: StoryNode): String =
    node match {
      case normalNode: NormalNode => this.handleNormalNode(normalNode)
      case deathNode: DeathNode   => this.handleDeathNode(deathNode)
      case winNode: WinNode       => this.handleWinNode(winNode)
    }

  private def handleNormalNode(node: NormalNode): String = {
    this.currentNode = node
    node.statement
  }

  private def handleDeathNode(node: DeathNode): String = {
    this.currentNode = this.startNode
    s"${node.statement} You died! x_x"
  }

  private def handleWinNode(node: WinNode): String = {
    this.currentNode = this.startNode
    s"${node.statement} You won! °˖✧◝(⁰▿⁰)◜✧˖°"
  }

  private def handleNoMatches(response: String) =
    response match {
      case "help"              => "You need help?"
      case RepeatPattern()     => this.currentNode.statement
      case LookAroundPattern() => lookAroundDescription()
      case _                   => "I don't understand"
    }

  private def lookAroundDescription(): String = {
    val items =
      this.currentNode.stuffToDo.map(stuff => s"${aOrAn(stuff.item)} ${stuff.item}").mkString(" and ")
    s"You can see $items."
  }

  private val vowels = "aeiou"
  private def aOrAn(word: String): String =
    if (word.headOption.map(vowels.contains(_)).getOrElse(false)) "an" else "a"

  private def findVerb(words: List[String]): Option[Verb] =
    Verbs.values.find(verb => words.contains(verb.toString()))

  private def findNoun(words: List[String]): Option[NounAndActions] =
    this.currentNode.stuffToDo.find(stuffToDo => words.contains(stuffToDo.item))

  private val RepeatPattern = "(?:.*)?could you repeat(?:.*)?".r
  private val LookAroundPattern = "(?:.*)?look around(?:.*)?".r
}
