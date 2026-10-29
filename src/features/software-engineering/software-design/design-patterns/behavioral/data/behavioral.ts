import type { PatternGuide } from '../../data/types';

export const behavioralGuides: Record<string, PatternGuide> = {
  "strategy": {
    useCase: { es: "Elegir tarjeta o PayPal para pagar el mismo pedido.", en: "Choose card or PayPal to pay for the same order." },
    code: `interface PaymentStrategy {
    String pay(int amount);
}

final class CardPayment implements PaymentStrategy {
    public String pay(int amount) {
        return "Tarjeta: " + amount;
    }
}

final class PayPalPayment implements PaymentStrategy {
    public String pay(int amount) {
        return "PayPal: " + amount;
    }
}

final class PaymentContext {
    private PaymentStrategy strategy;

    PaymentContext(PaymentStrategy strategy) {
        setStrategy(strategy);
    }

    void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    String pay(int amount) {
        return strategy.pay(amount);
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentContext context = new PaymentContext(new CardPayment());
        System.out.println(context.pay(100));
        context.setStrategy(new PayPalPayment());
        System.out.println(context.pay(100));
    }
}`,
    steps: [
      {
        title: { es: "Define el contrato de pago", en: "Define the payment contract" },
        why: { es: "Primero define pay para que todas las formas de pago se puedan usar del mismo modo", en: "First define pay so every payment method can be used in the same way" },
        from: 1, to: 3, focus: [2],
      },
      {
        title: { es: "Implementa las dos variantes", en: "Implement both variants" },
        why: { es: "Cada clase cumple el contrato con su propia forma de pagar", en: "Each class fulfills the contract with its own payment behavior" },
        from: 5, to: 15, focus: [7,13],
      },
      {
        title: { es: "Crea el contexto que delega", en: "Create the delegating context" },
        why: { es: "Ahora el contexto recibe una estrategia y le encarga el pago sin conocer su clase concreta", en: "The context now receives a strategy and delegates payment without knowing its concrete class" },
        from: 17, to: 31, focus: [18,25,29],
      },
      {
        title: { es: "Cambia la estrategia al usarlo", en: "Switch the strategy when using it" },
        why: { es: "Usa el mismo contexto con ambas estrategias para comprobar que cambia el comportamiento", en: "Use the same context with both strategies to verify that its behavior changes" },
        from: 33, to: 40, focus: [35,37],
      },
    ],
    output: "Tarjeta: 100\nPayPal: 100",
  },
  "state": {
    useCase: { es: "Bloquear y desbloquear un teléfono con el mismo botón.", en: "Lock and unlock a phone with the same button." },
    code: `interface PhoneState {
    String pressButton(Phone phone);
}

final class Phone {
    private PhoneState state = new Locked();

    String pressButton() {
        return state.pressButton(this);
    }

    void setState(PhoneState state) {
        this.state = state;
    }
}

final class Locked implements PhoneState {
    public String pressButton(Phone phone) {
        phone.setState(new Unlocked());
        return "Teléfono desbloqueado.";
    }
}

final class Unlocked implements PhoneState {
    public String pressButton(Phone phone) {
        phone.setState(new Locked());
        return "Teléfono bloqueado.";
    }
}

public class Main {
    public static void main(String[] args) {
        Phone phone = new Phone();
        System.out.println(phone.pressButton());
        System.out.println(phone.pressButton());
        System.out.println(phone.pressButton());
    }
}`,
    steps: [
      {
        title: { es: "Define la acción de los estados", en: "Define the states' action" },
        why: { es: "El contrato recibe el teléfono para que cada estado pueda decidir la siguiente transición", en: "The contract receives the phone so each state can choose the next transition" },
        from: 1, to: 3, focus: [2],
      },
      {
        title: { es: "Crea el teléfono con un estado", en: "Create the phone with a state" },
        why: { es: "El teléfono guarda su estado actual y le delega cada pulsación", en: "The phone stores its current state and delegates each button press to it" },
        from: 5, to: 15, focus: [6,9,13],
      },
      {
        title: { es: "Implementa las transiciones", en: "Implement the transitions" },
        why: { es: "Cada estado define la respuesta y deja preparado el estado que recibirá la próxima pulsación", en: "Each state defines the response and prepares the state that will receive the next button press" },
        from: 17, to: 29, focus: [19,26],
      },
      {
        title: { es: "Pulsa el mismo botón tres veces", en: "Press the same button three times" },
        why: { es: "La llamada no cambia pero su resultado depende del estado actual del teléfono", en: "The call stays the same but its result depends on the phone's current state" },
        from: 31, to: 38, focus: [34,35,36],
      },
    ],
    output: "Teléfono desbloqueado.\nTeléfono bloqueado.\nTeléfono desbloqueado.",
  },
  "visitor": {
    useCase: { es: "Calcular el área y el perímetro de figuras sin añadir esas operaciones a sus clases.", en: "Calculate shapes' area and perimeter without adding those operations to their classes." },
    code: `interface Shape {
    double accept(ShapeVisitor visitor);
}

interface ShapeVisitor {
    double visit(Circle circle);
    double visit(Rectangle rectangle);
}

final class Circle implements Shape {
    final double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    public double accept(ShapeVisitor visitor) {
        return visitor.visit(this);
    }
}

final class Rectangle implements Shape {
    final double width;
    final double height;

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double accept(ShapeVisitor visitor) {
        return visitor.visit(this);
    }
}

final class AreaVisitor implements ShapeVisitor {
    public double visit(Circle circle) {
        return Math.PI * circle.radius * circle.radius;
    }
    public double visit(Rectangle rectangle) {
        return rectangle.width * rectangle.height;
    }
}

final class PerimeterVisitor implements ShapeVisitor {
    public double visit(Circle circle) {
        return 2 * Math.PI * circle.radius;
    }
    public double visit(Rectangle rectangle) {
        return 2 * (rectangle.width + rectangle.height);
    }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {new Circle(3), new Rectangle(4, 5)};
        ShapeVisitor area = new AreaVisitor();
        ShapeVisitor perimeter = new PerimeterVisitor();
        for (Shape shape : shapes) {
            System.out.println("Área: " + shape.accept(area)
                    + " | Perímetro: " + shape.accept(perimeter));
        }
    }
}`,
    steps: [
      {
        title: { es: "Define los dos contratos", en: "Define both contracts" },
        why: { es: "La figura acepta visitantes y cada visitante declara una operación para cada tipo de figura", en: "A shape accepts visitors and each visitor declares an operation for every shape type" },
        from: 1, to: 8, focus: [2,6,7],
      },
      {
        title: { es: "Haz que el círculo acepte visitas", en: "Let the circle accept visitors" },
        why: { es: "Dentro de Circle la llamada visit(this) selecciona la operación que recibe un círculo", en: "Inside Circle the call to visit(this) selects the operation that receives a circle" },
        from: 10, to: 20, focus: [11,18],
      },
      {
        title: { es: "Conecta también el rectángulo", en: "Connect the rectangle too" },
        why: { es: "Repite accept en Rectangle para que esta figura seleccione su propia operación del visitante", en: "Repeat accept in Rectangle so this shape selects its own visitor operation" },
        from: 22, to: 34, focus: [23,24,32],
      },
      {
        title: { es: "Añade las operaciones en visitantes", en: "Add operations through visitors" },
        why: { es: "Ahora cada visitante reúne los cálculos de una operación sin modificar las figuras", en: "Each visitor now groups the calculations for one operation without changing the shapes" },
        from: 36, to: 52, focus: [36,45],
      },
      {
        title: { es: "Aplica ambas operaciones", en: "Apply both operations" },
        why: { es: "Recorre las mismas figuras y pásales cada visitante para obtener los dos resultados", en: "Iterate over the same shapes and pass each visitor to obtain both results" },
        from: 54, to: 64, focus: [56,60,61],
      },
    ],
    output: "Área: 28.274333882308138 | Perímetro: 18.84955592153876\nÁrea: 20.0 | Perímetro: 18.0",
  },
  "iterator": {
    useCase: { es: "Recorrer los libros de una estantería sin conocer cómo se guardan.", en: "Browse the books on a shelf without knowing how they are stored." },
    code: `import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

final class BookIterator implements Iterator<String> {
    private final List<String> books;
    private int position;

    BookIterator(List<String> books) {
        this.books = books;
    }

public boolean hasNext() {
        return position < books.size();
    }

    public String next() {
        if (!hasNext()) {
            throw new NoSuchElementException();
        }
        return books.get(position++);
    }
}

final class BookShelf implements Iterable<String> {
    private final List<String> books;

    BookShelf(List<String> books) {
        this.books = List.copyOf(books);
    }

    public Iterator<String> iterator() {
        return new BookIterator(books);
    }
}

public class Main {
    public static void main(String[] args) {
        BookShelf shelf = new BookShelf(List.of("Java", "SQL"));
        Iterator<String> iterator = shelf.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        System.out.println("Nuevo recorrido: " + shelf.iterator().next());
    }
}`,
    steps: [
      {
        title: { es: "Crea el iterador con su posición", en: "Create the iterator with its position" },
        why: { es: "Implementa Iterator y guarda una posición propia para que cada recorrido avance de forma independiente", en: "Implement Iterator and store a separate position so each traversal advances independently" },
        from: 1, to: 11, focus: [5,7],
      },
      {
        title: { es: "Añade el avance a BookIterator", en: "Add traversal to BookIterator" },
        why: { es: "hasNext comprueba el límite y next devuelve el libro actual antes de avanzar", en: "hasNext checks the limit and next returns the current book before advancing" },
        from: 13, to: 23, focus: [14,19,21],
      },
      {
        title: { es: "Haz que la estantería entregue iteradores", en: "Let the shelf provide iterators" },
        why: { es: "La colección implementa Iterable y devuelve un iterador nuevo en cada llamada", en: "The collection implements Iterable and returns a new iterator on every call" },
        from: 25, to: 35, focus: [25,33],
      },
      {
        title: { es: "Recorre y vuelve a empezar", en: "Traverse and start again" },
        why: { es: "Consume un iterador y pide otro para comprobar que empieza de nuevo por el primer libro", en: "Consume one iterator and request another to verify that it starts again at the first book" },
        from: 37, to: 46, focus: [41,42,44],
      },
    ],
    output: "Java\nSQL\nNuevo recorrido: Java",
  },
  "observer": {
    useCase: { es: "Avisar a los lectores suscritos cuando se publica una noticia.", en: "Notify subscribed readers when a news item is published." },
    code: `import java.util.ArrayList;
import java.util.List;

interface Subscriber {
    void update(String news);
}

final class Reader implements Subscriber {
    private final List<String> news = new ArrayList<>();

    public void update(String message) {
        news.add(message);
    }

    List<String> getNews() {
        return List.copyOf(news);
    }
}

final class NewsAgency {
    private final List<Subscriber> subscribers = new ArrayList<>();

    void subscribe(Subscriber subscriber) {
        if (!subscribers.contains(subscriber)) {
            subscribers.add(subscriber);
        }
    }

    void unsubscribe(Subscriber subscriber) {
        subscribers.remove(subscriber);
    }

void publish(String news) {
        for (Subscriber subscriber : List.copyOf(subscribers)) {
            subscriber.update(news);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();
        Reader ana = new Reader();
        Reader luis = new Reader();
        agency.subscribe(ana);
        agency.subscribe(luis);
        agency.publish("Primera noticia");
        agency.unsubscribe(luis);
        agency.publish("Actualización");
        System.out.println("Ana: " + ana.getNews());
        System.out.println("Luis: " + luis.getNews());
    }
}`,
    steps: [
      {
        title: { es: "Define cómo recibe avisos un suscriptor", en: "Define how a subscriber receives updates" },
        why: { es: "Declara update para que la agencia pueda avisar a cualquier suscriptor mediante el mismo contrato", en: "Declare update so the agency can notify any subscriber through the same contract" },
        from: 1, to: 6, focus: [5],
      },
      {
        title: { es: "Crea el lector que recibe noticias", en: "Create the reader that receives news" },
        why: { es: "El lector implementa update y guarda cada noticia recibida para poder comprobar el resultado", en: "The reader implements update and stores each received news item so the result can be checked" },
        from: 8, to: 18, focus: [8,12],
      },
      {
        title: { es: "Registra las suscripciones", en: "Register subscriptions" },
        why: { es: "La agencia guarda suscriptores y permite añadirlos o retirarlos sin conocer sus clases concretas", en: "The agency stores subscribers and lets them join or leave without knowing their concrete classes" },
        from: 20, to: 31, focus: [21,25,30],
      },
      {
        title: { es: "Añade el aviso a la agencia", en: "Add notification to the agency" },
        why: { es: "Al publicar una noticia recorre los suscriptores actuales y llama a update en cada uno", en: "When publishing a news item iterate over the current subscribers and call update on each one" },
        from: 33, to: 38, focus: [34,35],
      },
      {
        title: { es: "Publica y da de baja a un lector", en: "Publish and unsubscribe one reader" },
        why: { es: "Publica dos noticias y retira a Luis entre ambas para comprobar que deja de recibir avisos", en: "Publish two news items and unsubscribe Luis between them to verify that he stops receiving updates" },
        from: 40, to: 53, focus: [47,48,49],
      },
    ],
    output: "Ana: [Primera noticia, Actualización]\nLuis: [Primera noticia]",
  },
  "mediator": {
    useCase: { es: "Enviar mensajes a un grupo mediante una sala de chat.", en: "Send messages to a group through a chat room." },
    code: `import java.util.ArrayList;
import java.util.List;

final class ChatRoom {
    private final List<User> users = new ArrayList<>();

    void register(User user) {
        users.add(user);
    }

    void send(User sender, String message) {
        for (User user : users) {
            if (user != sender) {
                user.receive(sender.getName() + ": " + message);
            }
        }
    }
}

final class User {
    private final String name;
    private final ChatRoom room;
    private final List<String> messages = new ArrayList<>();

    User(String name, ChatRoom room) {
        this.name = name;
        this.room = room;
        room.register(this);
    }

String getName() { return name; }

    void send(String message) {
        room.send(this, message);
    }

    void receive(String message) {
        messages.add(message);
    }

    List<String> getMessages() { return List.copyOf(messages); }
}

public class Main {
    public static void main(String[] args) {
        ChatRoom room = new ChatRoom();
        User ana = new User("Ana", room);
        User luis = new User("Luis", room);
        User eva = new User("Eva", room);
        ana.send("Hola");
        System.out.println("Ana recibe: " + ana.getMessages());
        System.out.println("Luis recibe: " + luis.getMessages());
        System.out.println("Eva recibe: " + eva.getMessages());
    }
}`,
    steps: [
      {
        title: { es: "Crea la sala que coordina los mensajes", en: "Create the room that coordinates messages" },
        why: { es: "La sala registra usuarios y entrega cada mensaje a todos salvo al emisor", en: "The room registers users and delivers each message to everyone except its sender" },
        from: 1, to: 18, focus: [8,13,14],
      },
      {
        title: { es: "Conecta cada usuario con la sala", en: "Connect each user to the room" },
        why: { es: "El usuario recibe su sala y se registra en ella sin guardar referencias a los demás usuarios", en: "Each user receives its room and registers with it without storing references to other users" },
        from: 20, to: 29, focus: [22,28],
      },
      {
        title: { es: "Añade el envío y la recepción al usuario", en: "Add sending and receiving to the user" },
        why: { es: "El usuario encarga el envío a la sala y conserva los mensajes que esta le entrega", en: "The user delegates sending to the room and stores the messages that the room delivers" },
        from: 31, to: 42, focus: [34,38],
      },
      {
        title: { es: "Envía un mensaje al grupo", en: "Send a message to the group" },
        why: { es: "Ana envía un mensaje y la sala lo entrega a Luis y Eva sin devolvérselo a ella", en: "Ana sends a message and the room delivers it to Luis and Eva without sending it back to her" },
        from: 44, to: 55, focus: [46,50,51],
      },
    ],
    output: "Ana recibe: []\nLuis recibe: [Ana: Hola]\nEva recibe: [Ana: Hola]",
  },
};
