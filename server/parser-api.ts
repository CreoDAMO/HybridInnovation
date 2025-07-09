
import { Request, Response } from 'express';
import UltimateParserStack from '../core/ultimate-parser/parser-stack';

const parserStack = new UltimateParserStack();

export const initializeParser = async () => {
  try {
    await parserStack.initialize();
    console.log('✅ Parser API initialized');
  } catch (error) {
    console.error('❌ Parser API initialization failed:', error);
    throw error;
  }
};

export const parseCode = async (req: Request, res: Response) => {
  try {
    const { code, language, filename } = req.body;
    
    if (!code || !language) {
      return res.status(400).json({
        error: 'Code and language are required'
      });
    }

    const result = await parserStack.parseFile(
      filename || `temp.${language}`,
      code
    );

    res.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Parse error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.toString()
    });
  }
};

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
    const status = parserStack.getStatus();
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
