const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(

  {
    Model: {
      type: String,
      require: true,
    },
    MaterialsInspection: {
      type: String,
    },
    LinerMaterial: {
      type: String,
    },
    VisorMaterial: {
      type: String,
    },

    Testing: {
      type: String,
    },

    QualityControlChecks: {

      type: String,
    },
    Visorattachment: {

      type: String,
    },
    Strapstrength: {

      type: String,
    },
    Shellintegrity: {

      type: String,
    },




    DocumentationandTraceability: {
      type: String,
    },
    EmployeeTraining: {
      type: String,
    },
    Finalstatus: {
      type: String,
    },



    ImpactResistance: {
      type: String,
    },

    ImpactStandard: {
      type: String,
    },

    ImpactResult: {
      type: String,
    },

    PenetrationResistance: {
      type: String,
    },


    PenetrationStandard: {
      type: String,
    },
    PenetrationResult: {
      type: String,
    },
    RetentionSystem: {
      type: String,
    },
    RetentionStandard: {
      type: String,
    },
    RetentionResult: {
      type: String,
    },
    FieldOfVision: {
      type: String,
    },

    FieldOfVisionStandard: {
      type: String,
    },
    FieldOfVisionResult: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now // Optional: set a default value to the current date and time,

    },



  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
