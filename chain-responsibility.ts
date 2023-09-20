/*
Цепочка обязанностей (Chain of Responsibility) - это паттерн проектирования, который используется для построения цепочки объектов, каждый из которых может обработать запрос, передать его следующему объекту в цепи или просто проигнорировать. Этот паттерн позволяет создавать гибкие и расширяемые системы обработки запросов.

Основные компоненты цепочки обязанностей:
Handler (Обработчик): Это абстрактный класс или интерфейс, определяющий метод обработки запроса и ссылку на следующий обработчик в цепи. Обработчики могут быть разными и реализовывать обработку запроса по-разному.

ConcreteHandler (Конкретный обработчик): Это конкретные классы, которые наследуются от абстрактного обработчика. Каждый конкретный обработчик реализует свою логику обработки запроса и решает, должен ли он передавать запрос следующему обработчику в цепи.

Client (Клиент): Это объект, который создает и инициализирует начало цепи обработчиков и отправляет запрос в цепь. Клиент не знает о конкретных обработчиках и их порядке.

Пример использования паттерна "Цепочка обязанностей":
Предположим, у нас есть система для обработки заявок на рабочие задачи. Каждая заявка проходит через несколько этапов проверки: проверка на валидность, проверка на доступность исполнителя, проверка на сроки и т. д. Если заявка проходит успешно через все этапы проверки, она выполняется. Мы можем использовать цепочку обязанностей для реализации этой системы:
*/

abstract class Handler {
  protected nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  abstract handleRequest(request: string): string;
}

class Validator extends Handler {
  handleRequest(request: string): string {
    if (request === "Valid request") {
      return "Validation succeeded";
    } else if (this.nextHandler) {
      return this.nextHandler.handleRequest(request);
    }
    return "Validation failed";
  }
}

class AvailabilityChecker extends Handler {
  handleRequest(request: string): string {
    if (request === "Available request") {
      return "Availability check succeeded";
    } else if (this.nextHandler) {
      return this.nextHandler.handleRequest(request);
    }
    return "Availability check failed";
  }
}

class DeadlineChecker extends Handler {
  handleRequest(request: string): string {
    if (request === "On time request") {
      return "Deadline check succeeded";
    } else if (this.nextHandler) {
      return this.nextHandler.handleRequest(request);
    }
    return "Deadline check failed";
  }
}

// Создаем цепь обработчиков
const validator = new Validator();
const availabilityChecker = new AvailabilityChecker();
const deadlineChecker = new DeadlineChecker();

validator.setNext(availabilityChecker).setNext(deadlineChecker);

// Клиентский код
const request1 = "Valid request";
const request2 = "Available request";
const request3 = "On time request";
const request4 = "Invalid request";

console.log(validator.handleRequest(request1)); // Validation succeeded
console.log(validator.handleRequest(request2)); // Availability check succeeded
console.log(validator.handleRequest(request3)); // Deadline check succeeded
console.log(validator.handleRequest(request4)); // Deadline check failed
