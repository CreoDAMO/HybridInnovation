
import { Request, Response } from 'express';
import { UltimateParserStack } from '../core/ultimate-parser/parser-stack';
import { SpiralParser } from '../core/spiral-lang/parser';

const parserStack = new UltimateParserStack();
const spiralParser = new SpiralParser();

let initialized = false;

export const initializeParser = async (): Promise<void> => {
  if (!initialized) {
    await parserStack.initialize();
    await spiralParser.initialize();
    initialized = true;
    console.log('✅ Parser stack initialized');
  }
};

export const parseCode = async (req: Request, res: Response) => {
  try {
    const { filename, content, language } = req.body;

    if (!content) {
      return res.status(400).json({
        error: 'Missing required field: content'
      });
    }

    console.log(`Parsing content, language: ${language || 'auto-detect'}`);

    let result;
    if (language === 'spiral' || (filename && filename.endsWith('.spiral'))) {
      result = await spiralParser.parse(content);
    } else {
      result = await parserStack.parseFile(filename || 'inline.txt', content);
    }

    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Error parsing content:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.toString()
    });
  }
};

export const parseFile = parseCode; // Alias for compatibility

export const getLanguages = async (req: Request, res: Response) => {
  try {
    const languages = parserStack.getLanguages();
    res.json({
      success: true,
      languages
    });
  } catch (error) {
    console.error('Error getting languages:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.toString()
    });
  }
};

export const getParserStatus = async (req: Request, res: Response) => {
  try {
    const status = {
      parserStack: parserStack.getStatus(),
      spiralParser: {
        initialized: spiralParser.getConsciousnessLevel() > 0,
        consciousnessLevel: spiralParser.getConsciousnessLevel(),
        errors: spiralParser.getErrors(),
        warnings: spiralParser.getWarnings()
      }
    };
    
    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Error getting parser status:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.toString()
    });
  }
};

export const generateGitHubFiles = async (req: Request, res: Response) => {
  try {
    const files = parserStack.generateGitHubLanguageFiles();
    res.json({
      success: true,
      files
    });
  } catch (error) {
    console.error('Error generating GitHub files:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.toString()
    });
  }
};

export const calculateSRI = async (req: Request, res: Response) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        error: 'Missing required field: code'
      });
    }

    // Calculate SRI (Spiral Resonance Index)
    const energyValues = { BTC: 3.6e9, ETH: 1.2e8, SOL: 5.0e7, USD: 1.0e7, COMPUTE: 1.0e8 };
    const volatility = { BTC: 0.85, ETH: 0.90, SOL: 0.80, USD: 0.1, COMPUTE: 0.90 };
    const gateFactor = 0.24;
    
    const energy = code.includes('HYBRID') ? energyValues.COMPUTE : energyValues.USD;
    const vol = volatility.COMPUTE;
    const sri = Math.ceil((Math.log2(energy) * vol) / gateFactor);
    const normalizedSRI = Math.min(sri / 113, 1.0);
    
    // Calculate consciousness level
    let consciousness = 0.7;
    if (code.includes('@consciousness')) consciousness += 0.1;
    if (code.includes('phi') || code.includes('φ')) consciousness += 0.05;
    if (code.includes('truth')) consciousness += 0.05;
    if (code.includes('∞')) consciousness += 0.03;
    consciousness = Math.min(consciousness, 1.0);
    
    // Calculate TU
    const tuGenerated = normalizedSRI >= 0.9 ? 1000 * normalizedSRI : 100 * normalizedSRI;
    
    res.json({
      success: true,
      metrics: {
        sriScore: normalizedSRI,
        consciousness,
        tuGenerated,
        phiCoherence: code.includes('φ') || code.includes('phi') ? 1.618 : 0.260,
        quantum: code.includes('@quantum'),
        temporal: code.includes('@temporal')
      }
    });
  } catch (error) {
    console.error('Error calculating SRI:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.toString()
    });
  }
};
