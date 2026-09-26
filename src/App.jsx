import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import RootLayout from "./Layout/RootLayout/RootLayout";
import About from "./Pages/About";
import GetInTouch from "./Pages/getInTouch";
import Skills from "./Pages/skills";
import Registration from "./GlobalComponents/auth/registration";
import PrivacyPolicy from "./Pages/privacyPolicy";
import ProjectPlan from "./Pages/projectPlan";
import Pricing from "./Pages/pricing";
import TermsOfUse from "./Pages/Terms of Use";
import SoftwareDevelopment from "./Pages/softwareDevelopment";
import VatTaxCalculator from "./Pages/softwareDevelopment/VatTaxCalculator";
import ColorPaletteExtractor from "./Pages/softwareDevelopment/ColorPaletteExtractor";
import ResumeLandingPage from "./Pages/softwareDevelopment/ResumeLandingPage";
import SheetGrid from "./Pages/softwareDevelopment/SheetGrid";
import CryptoMarketTable from "./Pages/softwareDevelopment/CryptoMarketTable";
import AITextSummarizer from "./Pages/softwareDevelopment/AITexSummarizer";
import JsonFormatter from "./Pages/softwareDevelopment/JsonFormatter";
import QRCodeGenerator from "./Pages/softwareDevelopment/QRCodeGenerator";
import QRCodeScanner from "./Pages/softwareDevelopment/QRCodeScanner";
import WordCounter from "./Pages/softwareDevelopment/WordCounter";
import TextDiffChecker from "./Pages/softwareDevelopment/TextDiffChecker";
import CaseConverter from "./Pages/softwareDevelopment/CaseConverter";
import PercentageCalculator from "./Pages/softwareDevelopment/PercentageCalculator";
import GradientGenerator from "./Pages/softwareDevelopment/GradientGenerator";
import BackgroundRemover from "./Pages/softwareDevelopment/BackgroundRemover";
import WeatherDashboard from "./Pages/softwareDevelopment/WeatherDashboard";
import TriCalendar from "./Pages/softwareDevelopment/TriCalendar";
import ImageConverter from "./Pages/softwareDevelopment/ImageConverter";
import PdfMergeSplit from "./Pages/softwareDevelopment/PdfMergeSplit";
import ImageCompressor from "./Pages/softwareDevelopment/ImageCompressor";
import WorldClock from "./Pages/softwareDevelopment/WorldClock";
import RandomPicker from "./Pages/softwareDevelopment/RandomPicker";
import TimerTools from "./Pages/softwareDevelopment/TimerTools";
import AgeCalculator from "./Pages/softwareDevelopment/AgeCalculator";
import BanglaSongkhaToKotha from "./Pages/softwareDevelopment/BanglaSongkhaToKotha";
import ColorConverter from "./Pages/softwareDevelopment/ColorConverter";
import MarkdownPreviewer from "./Pages/softwareDevelopment/MarkdownPreviewer";
import PomodoroTimer from "./Pages/softwareDevelopment/PomodoroTimer";
import RegexTester from "./Pages/softwareDevelopment/RegexTester";
import UnitConverter from "./Pages/softwareDevelopment/UnitConverter";
import PasswordGenerator from "./Pages/softwareDevelopment/PasswordGenerator";
import TravelDestination from "./Pages/bestInnovation/TravelDestination";
import ConnectFour from "./Pages/bestInnovation/ConnectFour";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/get_in_touch" element={<GetInTouch />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/project_plan" element={<ProjectPlan />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms_of_use" element={<TermsOfUse />} />
        <Route
          path="/software_development/vattaxcalculator"
          element={<VatTaxCalculator />}
        />
        <Route
          path="/software_development/colorpaletteextractor"
          element={<ColorPaletteExtractor />}
        />
        <Route
          path="/software_development/resumelandingpage"
          element={<ResumeLandingPage />}
        />
        <Route path="/software_development/sheetgrid" element={<SheetGrid />} />
        <Route
          path="/software_development/cryptomarkettable"
          element={<CryptoMarketTable />}
        />
        <Route
          path="/software_development/aitextsummarizer"
          element={<AITextSummarizer />}
        />
        <Route
          path="/software_development/jsonformatter"
          element={<JsonFormatter />}
        />
        <Route
          path="/software_development/qrcodegenerator"
          element={<QRCodeGenerator />}
        />
        <Route
          path="/software_development/qrcodescanner"
          element={<QRCodeScanner />}
        />
        <Route
          path="/software_development/wordcounter"
          element={<WordCounter />}
        />
        <Route
          path="/software_development/textdiffchecker"
          element={<TextDiffChecker />}
        />
        <Route
          path="/software_development/caseconverter"
          element={<CaseConverter />}
        />
        <Route
          path="/software_development/percentagecalculator"
          element={<PercentageCalculator />}
        />
        <Route
          path="/software_development/gradientgenerator"
          element={<GradientGenerator />}
        />
        <Route
          path="/software_development/backgroundremover"
          element={<BackgroundRemover />}
        />
        <Route
          path="/software_development/weatherdashboard"
          element={<WeatherDashboard />}
        />
        <Route
          path="/software_development/tricalendar"
          element={<TriCalendar />}
        />
        <Route
          path="/software_development/imageconverter"
          element={<ImageConverter />}
        />
        <Route
          path="/software_development/pdfmergesplit"
          element={<PdfMergeSplit />}
        />
        <Route
          path="/software_development/imagecompressor"
          element={<ImageCompressor />}
        />
        <Route
          path="/software_development/worldclock"
          element={<WorldClock />}
        />
        <Route
          path="/software_development/randompicker"
          element={<RandomPicker />}
        />
        <Route
          path="/software_development/timertools"
          element={<TimerTools />}
        />
        <Route
          path="/software_development/agecalculator"
          element={<AgeCalculator />}
        />
        <Route
          path="/software_development/banglasongkhatokotha"
          element={<BanglaSongkhaToKotha />}
        />
        <Route
          path="/software_development/colorconverter"
          element={<ColorConverter />}
        />
        <Route
          path="/software_development/markdownpreviewer"
          element={<MarkdownPreviewer />}
        />
        <Route
          path="/software_development/passwordgenerator"
          element={<PasswordGenerator />}
        />
        <Route
          path="/software_development/pomodorotimer"
          element={<PomodoroTimer />}
        />
        <Route
          path="/software_development/regextester"
          element={<RegexTester />}
        />
        <Route
          path="/software_development/unitconverter"
          element={<UnitConverter />}
        />

        {/* //Best Innovation Project */}
        <Route
          path="/bestinnovation/dashboard/traveldestination"
          element={<TravelDestination />}
        />
        <Route
          path="/bestinnovation/game/connectfour"
          element={<ConnectFour />}
        />
      </Route>,
    ),
  );
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
