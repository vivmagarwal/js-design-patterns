# Memento Design Pattern

**Memento** literally means rememberance, memorial or token. **Memento** design pattern is used to **restore** the state of an object to its **previous state**. The **Memento** captures an object's internal state so that the object can later be restored to that state.

## Example

The Undo/Redo operation in a text editor

## Applicability
The **Memento** pattern is used in Undo and Redo operations in most of the software.

## Explaination
The Memento patten delegates creating the state snapshots to the actual owner of that state, the originator object. Hence, instead of other objects trying to copy the editor's state from outside, the editor class itself can make the snapshot since it has full access to its own state.

In our example, The Editor class itself has `createState` and `resotreState` methods.

The patten suggests storing the copy of object's state in a special object called memento. The contents of memento are not accessible to any other object except the one that produced it.

In our example, the Memento is the `EditorState` class. The Editor's state is stored in an EditorState object using the editors createState method. 

Other objects must communicate with mementos using a limited interface which may allow fetching the snapshot's metatdata, but not the original objet's state contained in the snapshot.

Such restrictive policy let's you store mementos inside other objects, usually called caretakers. Since caretaker works with the memento only via the limited interface, it's not able to tamper with the state stored inside the memento.

In our example the caretaker is the `History` class. and History object manages a list of all the `EditorState` objects created by the `Editor` class.

