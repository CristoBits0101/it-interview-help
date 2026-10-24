import type { PatternGuide } from './types';

export const creationalGuides: Record<string, PatternGuide> = {
  "factory": {
    useCase: {"es":"Elegir una notificación por email o SMS según el canal recibido.","en":"Choose an email or SMS notification based on the supplied channel."},
    code: `interface Notification {
    String send(String message);
}

final class EmailNotification implements Notification {
    public String send(String message) {
        return "EMAIL: " + message;
    }
}

final class SmsNotification implements Notification {
    public String send(String message) {
        return "SMS: " + message;
    }
}

final class NotificationFactory {
    private NotificationFactory() {}

    public static Notification create(String channel) {
        return switch (channel) {
            case "email" -> new EmailNotification();
            case "sms" -> new SmsNotification();
            default -> throw new IllegalArgumentException("Canal desconocido.");
        };
    }
}

public class Main {
    public static void main(String[] args) {
        Notification email = NotificationFactory.create("email");
        Notification sms = NotificationFactory.create("sms");
        System.out.println(email.send("Pedido confirmado."));
        System.out.println(sms.send("Pedido enviado."));
    }
}`,
    steps: [
      {
        title: {"es":"Define el contrato","en":"Define the contract"},
        why: {"es":"Primero define la operación que compartirán todas las notificaciones.","en":"First define the operation that all notifications will share."},
        from: 1, to: 3, focus: [2],
      },
      {
        title: {"es":"Implementa las variantes","en":"Implement the variants"},
        why: {"es":"Cada clase cumple el contrato con su propia forma de enviar el mensaje.","en":"Each class fulfills the contract with its own way of sending the message."},
        from: 5, to: 15, focus: [5,7,13],
      },
      {
        title: {"es":"Centraliza la creación","en":"Centralize creation"},
        why: {"es":"La fábrica devuelve la implementación correspondiente al canal recibido.","en":"The factory returns the implementation matching the supplied channel."},
        from: 17, to: 27, focus: [20,22,23],
      },
      {
        title: {"es":"Solicita y usa el objeto","en":"Request and use the object"},
        why: {"es":"El cliente pide un canal y utiliza la notificación mediante el contrato común.","en":"The client requests a channel and uses the notification through the common contract."},
        from: 29, to: 36, focus: [31,32,33],
      },
    ],
    output: "EMAIL: Pedido confirmado.\nSMS: Pedido enviado.",
  },
  "builder": {
    useCase: {"es":"Configurar un coche eligiendo su color y número de puertas.","en":"Configure a car by choosing its color and number of doors."},
    code: `final class Car {
    private final String brand;
    private final int doors;
    private final String color;

    Car(String brand, int doors, String color) {
        this.brand = brand;
        this.doors = doors;
        this.color = color;
    }

    public String describe() {
        return brand + " / " + doors + " puertas / " + color;
    }
}

final class CarBuilder {
    private final String brand;
    private int doors = 4;
    private String color = "blanco";

    public CarBuilder(String brand) {
        this.brand = brand;
    }

    public CarBuilder withDoors(int doors) {
        this.doors = doors;
        return this;
    }

    public CarBuilder withColor(String color) {
        this.color = color;
        return this;
    }

    public Car build() {
        return new Car(brand, doors, color);
    }
}

public class Main {
    public static void main(String[] args) {
        CarBuilder builder = new CarBuilder("Toyota").withColor("rojo");
        Car first = builder.withDoors(4).build();
        Car second = builder.withDoors(2).build();
        System.out.println("Primero: " + first.describe());
        System.out.println("Segundo: " + second.describe());
    }
}`,
    steps: [
      {
        title: {"es":"Define el resultado","en":"Define the result"},
        why: {"es":"Primero crea el coche que recibirá la configuración y conservará sus valores.","en":"First create the car that will receive the configuration and retain its values."},
        from: 1, to: 15, focus: [2,3,4],
      },
      {
        title: {"es":"Guarda las opciones","en":"Store the options"},
        why: {"es":"El constructor guarda las opciones elegidas antes de crear el coche.","en":"The builder stores the selected options before creating the car."},
        from: 17, to: 24, focus: [19,20,23],
      },
      {
        title: {"es":"Añade pasos encadenables","en":"Add chainable steps"},
        why: {"es":"Cada método cambia una opción y devuelve el mismo constructor para continuar configurándolo.","en":"Each method changes an option and returns the same builder to continue configuring it."},
        from: 26, to: 34, focus: [27,28,33],
      },
      {
        title: {"es":"Crea un resultado nuevo","en":"Create a new result"},
        why: {"es":"build crea un coche nuevo para que los siguientes cambios del constructor no lo modifiquen.","en":"build creates a new car so later builder changes cannot modify it."},
        from: 36, to: 38, focus: [37],
      },
      {
        title: {"es":"Configura y construye","en":"Configure and build"},
        why: {"es":"Reutiliza el constructor para crear dos coches y comprueba que el primero conserva sus opciones.","en":"Reuse the builder to create two cars and check that the first retains its options."},
        from: 41, to: 49, focus: [43,44,45],
      },
    ],
    output: "Primero: Toyota / 4 puertas / rojo\nSegundo: Toyota / 2 puertas / rojo",
  },
  "prototype": {
    useCase: {"es":"Crear otro servidor con la misma configuración y cambiar su IP.","en":"Create another server with the same configuration and change its IP."},
    code: `final class ServerConfig {
    private String ip;
    private final int port;

    public ServerConfig(String ip, int port) {
        this.ip = ip;
        this.port = port;
    }

    public ServerConfig copy() {
        return new ServerConfig(ip, port);
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String address() {
        return ip + ":" + port;
    }
}

public class Main {
    public static void main(String[] args) {
        ServerConfig original = new ServerConfig("192.0.2.10", 8080);
        ServerConfig copy = original.copy();
        copy.setIp("192.0.2.20");
        System.out.println("Original: " + original.address());
        System.out.println("Copia: " + copy.address());
    }
}`,
    steps: [
      {
        title: {"es":"Define la configuración","en":"Define the configuration"},
        why: {"es":"Primero guarda la IP y el puerto que tendrá cada configuración de servidor.","en":"First store the IP and port belonging to each server configuration."},
        from: 1, to: 8, focus: [2,3,5],
      },
      {
        title: {"es":"Añade la copia","en":"Add copying"},
        why: {"es":"copy crea otro objeto con los valores actuales para poder modificarlo de forma independiente.","en":"copy creates another object with the current values so it can be modified independently."},
        from: 10, to: 12, focus: [11],
      },
      {
        title: {"es":"Permite cambiar la IP","en":"Allow changing the IP"},
        why: {"es":"Añade el cambio de IP y un método para consultar la dirección resultante.","en":"Add the IP change and a method to inspect the resulting address."},
        from: 14, to: 20, focus: [15,19],
      },
      {
        title: {"es":"Copia y comprueba","en":"Copy and check"},
        why: {"es":"Cambia la IP de la copia y comprueba que el original conserva su dirección.","en":"Change the copy’s IP and check that the original keeps its address."},
        from: 23, to: 31, focus: [26,27,28],
      },
    ],
    output: "Original: 192.0.2.10:8080\nCopia: 192.0.2.20:8080",
  },
  "singleton": {
    useCase: {"es":"Compartir la misma configuración entre varias partes de la aplicación.","en":"Share the same settings across different parts of the application."},
    code: `final class Settings {
    private Settings() {}

    private static final Settings INSTANCE = new Settings();

    public static Settings getInstance() {
        return INSTANCE;
    }
}

public class Main {
    public static void main(String[] args) {
        Settings first = Settings.getInstance();
        Settings second = Settings.getInstance();
        System.out.println("Misma instancia: " + (first == second));
    }
}`,
    steps: [
      {
        title: {"es":"Cierra la creación","en":"Restrict creation"},
        why: {"es":"Primero impide que otras clases creen instancias con new mediante un constructor privado.","en":"First prevent other classes from creating instances with new by making the constructor private."},
        from: 1, to: 2, focus: [2],
      },
      {
        title: {"es":"Conserva y expone la instancia","en":"Keep and expose the instance"},
        why: {"es":"La clase crea una instancia y devuelve siempre esa misma referencia.","en":"The class creates one instance and always returns that same reference."},
        from: 4, to: 8, focus: [4,7],
      },
      {
        title: {"es":"Comprueba la identidad","en":"Check identity"},
        why: {"es":"Pide la instancia dos veces y compara las referencias para comprobar que apuntan al mismo objeto.","en":"Request the instance twice and compare the references to check that they point to the same object."},
        from: 11, to: 17, focus: [13,14,15],
      },
    ],
    output: "Misma instancia: true",
  },
  "factory-method": {
    useCase: {"es":"Reutilizar el envío de notificaciones aunque cada servicio elija email o SMS.","en":"Reuse notification sending while each service chooses email or SMS."},
    code: `interface Notification {
    String send(String message);
}

final class EmailNotification implements Notification {
    public String send(String message) {
        return "EMAIL: " + message;
    }
}

final class SmsNotification implements Notification {
    public String send(String message) {
        return "SMS: " + message;
    }
}

abstract class NotificationService {
    protected abstract Notification createNotification();

    public final String notifyUser(String message) {
        if (message == null || message.isBlank()) {
            throw new IllegalArgumentException("Mensaje vacío.");
        }
        return createNotification().send(message);
    }
}

final class EmailNotificationService extends NotificationService {
    protected Notification createNotification() {
        return new EmailNotification();
    }
}

final class SmsNotificationService extends NotificationService {
    protected Notification createNotification() {
        return new SmsNotification();
    }
}

public class Main {
    public static void main(String[] args) {
        NotificationService email = new EmailNotificationService();
        NotificationService sms = new SmsNotificationService();
        System.out.println(email.notifyUser("Pedido confirmado."));
        System.out.println(sms.notifyUser("Pedido enviado."));
    }
}`,
    steps: [
      {
        title: {"es":"Define el producto común","en":"Define the shared product"},
        why: {"es":"Primero define la operación que el servicio necesitará sin elegir todavía una clase concreta.","en":"First define the operation the service needs without choosing a concrete class yet."},
        from: 1, to: 3, focus: [2],
      },
      {
        title: {"es":"Implementa los productos","en":"Implement the products"},
        why: {"es":"Email y SMS cumplen el mismo contrato para que el servicio pueda utilizar cualquiera.","en":"Email and SMS fulfill the same contract so the service can use either."},
        from: 5, to: 15, focus: [5,7,13],
      },
      {
        title: {"es":"Define el proceso compartido","en":"Define the shared process"},
        why: {"es":"La clase padre valida el mensaje y usa el producto devuelto por su método de creación.","en":"The parent class validates the message and uses the product returned by its creation method."},
        from: 17, to: 26, focus: [18,21,24],
      },
      {
        title: {"es":"Decide qué producto crear","en":"Choose which product to create"},
        why: {"es":"Cada subclase decide qué notificación crear mientras hereda el proceso de envío.","en":"Each subclass chooses which notification to create while inheriting the sending process."},
        from: 28, to: 38, focus: [28,30,36],
      },
      {
        title: {"es":"Utiliza el servicio","en":"Use the service"},
        why: {"es":"Elige un servicio y ejecuta el mismo proceso de envío con el producto que crea.","en":"Choose a service and run the same sending process with the product it creates."},
        from: 40, to: 47, focus: [42,43,44],
      },
    ],
    output: "EMAIL: Pedido confirmado.\nSMS: Pedido enviado.",
  },
};
