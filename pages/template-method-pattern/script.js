console.log('template-method-pattern works!!');

// Example from Mosh's tutorial
// https://codewithmosh.com/courses/759570/lectures/13732485

// The problem we're trying to solve.
(()=>{
  // Problem: code duplication; code of both the tasks are very repetative;
  // No common interface / strucutre enforcing of tasks;
  
  // transfer money
  // generate report
  
  class TransferMoneyTask {
    constructor(auditTrial) {
      this.auditTrial = auditTrial;
    }

    execute() {
      this.auditTrial.record();
      console.log("Transfer money");
    }
  }

  class GenerateReportTask {
    constructor(auditTrial) {
      this.auditTrial = auditTrial;
    }

    execute() {
      this.auditTrial.record();
      console.log("Generate report");
    }
  }

  class AuditTrial {
    record() {
      console.log("Audit");
    }
  }

  // Usage
  let auditTrial = new AuditTrial();
  let task = new TransferMoneyTask(auditTrial);
  task.execute();

  let report = new GenerateReportTask(auditTrial);
  report.execute();

})();

console.log('=======================================');

// Solution
/**
 * Abstract class
 * -- template method() <-- contains repetitive code which also calls primitive operations.
 * -- primitiveOperation1() <-- abstract method (commonly known as hooks)
 * -- primitiveOperation2() <-- abstract method (commonly known as hooks)
 * 
 * Concrete class
 * -- primitiveOperation1(){ with implemntation } 
 * -- primitiveOperation2() { with implementation }
 * 
 * This solution basically uses inheritance. ofcouse if we want to use composition/polymorphism we may use strategy to solve the same problem.
 */

(() => {
  
  class AuditTrial {
    record() {
      console.log("Audit");
    }
  }

  class Task {
    constructor(auditTrial) {
      this.auditTrial = auditTrial;
    }
    
    execute() {
      this.auditTrial.record();
      this._doExecute();
    }

    _doExecute() { /* protected abstract */}
  }

  class TransferMoneyTask extends Task {
    constructor(auditTrial) {
      super(auditTrial);
    }

    _doExecute() {
      console.log("Transfer Money");
    }
  }

  class GenerateReportTask extends Task {
    constructor(auditTrial) {
      super(auditTrial);
    }

    _doExecute() {
      console.log("Generate report");
    }
  }

  // Usage

  let auditTrial = new AuditTrial();
  let task = new TransferMoneyTask(auditTrial);
  task.execute();

  let report = new GenerateReportTask(auditTrial);
  report.execute();

})();