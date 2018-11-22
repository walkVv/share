package lerrain.tool.script.warlock.statement;

import lerrain.tool.formula.Factors;
import lerrain.tool.script.Stack;
import lerrain.tool.script.warlock.Code;
import lerrain.tool.script.warlock.Reference;
import lerrain.tool.script.warlock.analyse.Words;

public class Variable extends Code implements Reference
{
	String varName;
	
	public Variable(Words ws)
	{
		super(ws);

		this.varName = ws.getWord(0);
	}

	public Object run(Factors factors)
	{
		//作废
		if ("timems".equals(varName))
			return Double.valueOf((double)System.currentTimeMillis());
		
		return factors.get(varName);
	}
	
	public void let(Factors factors, Object value)
	{
		((Stack)factors).set(varName, value);
	}
	
	public String toString()
	{
		return varName;
	}

	public String toText(String space, boolean line)
	{
		return varName;
	}
}
