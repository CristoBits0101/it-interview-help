import type { PatternGuide } from './types';

export const structuralGuides: Record<string, PatternGuide> = {
  facade: {
    useCase: {
      es: 'Encender la televisión y el sonido con una sola llamada.',
      en: 'Turn on the television and sound with a single call.',
    },
    code: String.raw`final class Television {
    public String turnOn() {
        return "Televisión encendida";
    }
}

final class SoundSystem {
    public String turnOn() {
        return "Sonido encendido";
    }
}

final class HomeTheater {
    private final Television television = new Television();
    private final SoundSystem sound = new SoundSystem();

    public String watchMovie() {
        return television.turnOn()
            + "\n" + sound.turnOn()
            + "\nPelícula iniciada";
    }
}

public class Main {
    public static void main(String[] args) {
        HomeTheater theater = new HomeTheater();
        System.out.println(theater.watchMovie());
    }
}`,
    steps: [
      {
        title: { es: 'Crea los componentes', en: 'Create the components' },
        why: {
          es: 'Primero define las operaciones que la fachada tendrá que coordinar.',
          en: 'First define the operations that the facade will coordinate.',
        },
        from: 1, to: 11, focus: [2, 8],
      },
      {
        title: { es: 'Reúne las llamadas en la fachada', en: 'Bring the calls together in the facade' },
        why: {
          es: 'Crea una clase que use ambos componentes para ofrecer una operación común.',
          en: 'Create a class that uses both components to provide one shared operation.',
        },
        from: 13, to: 22, focus: [17, 18, 19],
      },
      {
        title: { es: 'Usa la operación común', en: 'Use the shared operation' },
        why: {
          es: 'El cliente llama a watchMovie porque la fachada ya conoce los componentes y su orden.',
          en: 'The client calls watchMovie because the facade already knows the components and their order.',
        },
        from: 24, to: 29, focus: [27],
      },
    ],
    output: 'Televisión encendida\nSonido encendido\nPelícula iniciada',
  },

  adapter: {
    useCase: {
      es: 'Encender un LED de 5 V con un control que solo conoce turnOn.',
      en: 'Turn on a 5 V LED through a control that only knows turnOn.',
    },
    code: String.raw`interface Switchable {
    String turnOn();
}

final class LegacyLed {
    public String connect(int voltage) {
        return "LED encendido a " + voltage + " V";
    }
}

final class LedAdapter implements Switchable {
    private final LegacyLed led;

    public LedAdapter(LegacyLed led) {
        this.led = led;
    }

    @Override
    public String turnOn() {
        return led.connect(5);
    }
}

public class Main {
    public static void main(String[] args) {
        Switchable light = new LedAdapter(new LegacyLed());
        System.out.println(light.turnOn());
    }
}`,
    steps: [
      {
        title: { es: 'Define la interfaz del cliente', en: 'Define the client interface' },
        why: {
          es: 'Define primero turnOn para que el cliente pueda encender cualquier objeto con ese contrato.',
          en: 'First define turnOn so the client can turn on any object with that contract.',
        },
        from: 1, to: 3, focus: [2],
      },
      {
        title: { es: 'Identifica la interfaz existente', en: 'Identify the existing interface' },
        why: {
          es: 'El LED recibe un voltaje mediante connect. Conserva esa clase para adaptar su uso desde fuera.',
          en: 'The LED receives a voltage through connect. Keep this class and adapt its use from outside.',
        },
        from: 5, to: 9, focus: [6],
      },
      {
        title: { es: 'Traduce la llamada', en: 'Translate the call' },
        why: {
          es: 'Implementa turnOn delegando en connect con 5 V para conectar ambas interfaces.',
          en: 'Implement turnOn by delegating to connect with 5 V to connect both interfaces.',
        },
        from: 11, to: 22, focus: [11, 20],
      },
      {
        title: { es: 'Usa el adaptador', en: 'Use the adapter' },
        why: {
          es: 'Declara la variable como Switchable para usar el adaptador mediante el contrato del cliente.',
          en: 'Declare the variable as Switchable to use the adapter through the client contract.',
        },
        from: 24, to: 29, focus: [26, 27],
      },
    ],
    output: 'LED encendido a 5 V',
  },

  decorator: {
    useCase: {
      es: 'Añadir leche y azúcar a un café sin crear una clase para cada combinación.',
      en: 'Add milk and sugar to a coffee without creating a class for every combination.',
    },
    code: String.raw`interface Coffee {
    int priceInCents();
}

final class PlainCoffee implements Coffee {
    @Override
    public int priceInCents() {
        return 200;
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected final Coffee coffee;

    protected CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
}

final class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public int priceInCents() {
        return coffee.priceInCents() + 50;
    }
}

final class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public int priceInCents() {
        return coffee.priceInCents() + 20;
    }
}

public class Main {
    public static void main(String[] args) {
        Coffee plain = new PlainCoffee();
        Coffee decorated = new SugarDecorator(new MilkDecorator(plain));
        System.out.println(plain.priceInCents());
        System.out.println(decorated.priceInCents());
    }
}`,
    steps: [
      {
        title: { es: 'Define el contrato y el café base', en: 'Define the contract and plain coffee' },
        why: {
          es: 'Define el precio en céntimos para que el café y sus decoradores compartan la misma operación.',
          en: 'Define the price in cents so the coffee and its decorators share the same operation.',
        },
        from: 1, to: 10, focus: [2, 8],
      },
      {
        title: { es: 'Crea la base del decorador', en: 'Create the decorator base' },
        why: {
          es: 'Guarda un Coffee dentro de otro Coffee para poder envolver tanto cafés simples como decorados.',
          en: 'Store a Coffee inside another Coffee so both plain and decorated coffees can be wrapped.',
        },
        from: 12, to: 18, focus: [12, 13, 16],
      },
      {
        title: { es: 'Añade cada extra por separado', en: 'Add each extra separately' },
        why: {
          es: 'Cada decorador consulta el precio del objeto envuelto y suma su propio coste.',
          en: 'Each decorator asks the wrapped object for its price and adds its own cost.',
        },
        from: 20, to: 40, focus: [27, 38],
      },
      {
        title: { es: 'Combina los decoradores', en: 'Combine the decorators' },
        why: {
          es: 'Envuelve el café con leche y después con azúcar. El café original conserva su precio.',
          en: 'Wrap the coffee with milk and then sugar. The original coffee keeps its price.',
        },
        from: 42, to: 49, focus: [45, 46, 47],
      },
    ],
    output: '200\n270',
  },
};
