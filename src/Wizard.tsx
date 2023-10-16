import * as React from 'react';
import { Button, Box, Stepper, Step, StepLabel, StepContent, Paper, Typography, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createTheme } from '@mui/material/styles';

// declare module '@mui/material/styles' {
//   interface Palette {
//     custom: Palette['primary'];
//   }

//   interface PaletteOptions {
//     custom?: PaletteOptions['primary'];
//   }
// }
const theme = createTheme({
  palette: {
    primary: {
      main: '#f9f5e3',
    },
    secondary: {
      main: '#f9f5e3',
    },
  },
});

const steps = [
  {
    label: 'Welcome to the Pokemon Club',
    description: `Welcome to the Pokemon Club! Let's get you started on your journey 
    to become a member. Click "Continue" to begin.`,
  },
  {
    label: 'Personal Information',
    description:
      `Provide us with your name email so we
        can set up your account and keep you updated on club activities.`,
  },
  {
    label: 'Choose Your Starter Pokemon',
    description: `Select your first Pokemon companion from our list of starters. 
                Your choice will accompany you on your adventures and battles.`,
  },

];
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Wizard() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Stepper activeStep={activeStep} alternativeLabel orientation="horizontal">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent>
              {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> */}
              <Box sx={{ mb: 2, mt:2 }}>
              <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center" >{step.description}</Typography>
              </Box>

              {/* </Paper>   */}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    color="primary"
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
        <Step key="wizard">
          <StepLabel>Join the Club!</StepLabel>
          <StepContent>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                handleNext();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      type="text"
                      name="name"
                      label="Name"
                      placeholder="Enter your name"
                      as={TextField}
                      fullWidth
                      sx={{ mt: 2, mr: 1 }}
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      as={TextField}
                      fullWidth
                      sx={{ mt: 2, mr: 1 }}
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      as={TextField}
                      fullWidth
                      sx={{ mt: 2, mr: 1 }}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    sx={{ mt: 2, mr: 1 }}
                  >
                    Join the Club!
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ mt: 2, mr: 1 }}
                  >
                    Back
                  </Button>
                </Form>
              )}
            </Formik>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Wizard;
