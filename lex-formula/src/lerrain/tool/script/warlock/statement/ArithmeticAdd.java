package lerrain.tool.script.warlock.statement;

import lerrain.tool.formula.Factors;
import lerrain.tool.script.warlock.Code;
import lerrain.tool.script.warlock.analyse.Expression;
import lerrain.tool.script.warlock.analyse.Words;

import java.util.List;

public class ArithmeticAdd extends Code
{
	Code lc, rc;
	
	public ArithmeticAdd(Words ws, int i)
	{
		super(ws, i);

		lc = Expression.expressionOf(ws.cut(0, i));
		rc = Expression.expressionOf(ws.cut(i + 1));
	}

	public Object run(Factors factors)
	{
		Object l = lc.run(factors);
		Object r = rc.run(factors);

		if (l instanceof Number && r instanceof Number)
		{
			if (isFloat(l) || isFloat(r))
				return ((Number)l).doubleValue() + ((Number)r).doubleValue();
			else if (isInt(l) && isInt(r))
				return ((Number)l).intValue() + ((Number)r).intValue();
			else
				return ((Number)l).longValue() + ((Number)r).longValue();

//			return left.toDecimal().add(right.toDecimal());
//			return Double.valueOf(left.doubleValue() + right.doubleValue());
		}
		if ((l instanceof List || l instanceof Object[]) && (r instanceof List || r instanceof Object[]))
		{
			Object[] o1, o2;

			if (l instanceof List)
				o1 = ((List)l).toArray();
			else
				o1 = (Object[])l;

			if (r instanceof List)
				o2 = ((List)r).toArray();
			else
				o2 = (Object[])r;

			Object[] o3 = new Object[o1.length + o2.length];

//			for (int i = 0; i < o1.length; i++)
//				o3[i] = o1[i];
//			for (int i = 0; i < o2.length; i++)
//				o3[i + o1.length] = o2[i];

			System.arraycopy(o1, 0, o3, 0, o1.length);
			System.arraycopy(o2, 0, o3, o1.length, o2.length);

			return o3;
		}
		else if (l == null)
		{
			return r;
		}
		else if (r == null)
		{
			return l;
		}
		else
		{
			return l.toString() + r.toString();
		}
	}

	public String toText(String space, boolean line)
	{
		return lc.toText("", line) + " + " + rc.toText("", line);
	}
}