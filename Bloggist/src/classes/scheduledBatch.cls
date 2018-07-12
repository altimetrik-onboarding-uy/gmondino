global class scheduledBatch implements Schedulable {
	   global void execute(SchedulableContext sc) {
	      emailNotificationBatch b = new emailNotificationBatch();
	      database.executebatch(b);
	   }
}

//scheduledBatch m = new scheduledBatch();
//String sch = '0 0 0 1/1 * ? *';
//String jobID = system.schedule('Sched posts', sch, m);