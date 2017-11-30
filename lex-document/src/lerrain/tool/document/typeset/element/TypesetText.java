package lerrain.tool.document.typeset.element;

import java.util.ArrayList;
import java.util.List;

import lerrain.tool.document.LexColor;
import lerrain.tool.document.LexFont;
import lerrain.tool.document.element.DocumentPanel;
import lerrain.tool.document.element.DocumentText;
import lerrain.tool.document.element.LexElement;
import lerrain.tool.document.typeset.TypesetBuildException;
import lerrain.tool.document.typeset.TypesetCoord;
import lerrain.tool.document.typeset.TypesetParameters;
import lerrain.tool.document.typeset.TypesetUtil;
import lerrain.tool.document.typeset.environment.TextDimension;
import lerrain.tool.formula.Factors;
import lerrain.tool.formula.Formula;
import lerrain.tool.formula.Value;

public class TypesetText extends TypesetElement
{
	static TextDimension textDimension;

	private LexElement buildFixed(final TypesetParameters tvs)
	{
		Integer textx = (Integer)tvs.get("text_x"); //layout偏移
		Integer texty = (Integer)tvs.get("text_y"); //layout偏移
		
		int x = textx == null ? 0 : textx.intValue();
		int y = texty == null ? 0 : texty.intValue();
		int fullWidth = this.getWidth() == null ? 0 : this.getWidth().value(tvs);
		int fullHeight = this.getHeight() == null ? 0 : this.getHeight().value(tvs);
		
		final DocumentPanel dPanel = new DocumentPanel();
		dPanel.setType(2);
		dPanel.setColor(color);
		dPanel.setBgColor(bgColor);
		dPanel.setX((this.getX() == null ? 0 : this.getX().value(tvs)) + x);
		dPanel.setY((tvs.getDatum() + (this.getY() == null ? 0 : this.getY().value(tvs))) + y);
		dPanel.setWidth(fullWidth);
		dPanel.setHeight(fullHeight);
		dPanel.setHorizontalAlign(this.getAlign());
		dPanel.setVerticalAlign(this.getVerticalAlign());
		dPanel.setBorder(valueOf(getLeftBorder(), tvs), valueOf(getTopBorder(), tvs), valueOf(getRightBorder(), tvs), valueOf(getBottomBorder(), tvs));
		dPanel.setBorderColor(this.getBorderColor());
		
		final DocumentText e = new DocumentText();
		e.setFont(this.getFont());
		dPanel.add(e);
		
		e.setResetAtFinal(new Formula() 
		{
			@Override
			public Object run(Factors factors)
			{
				int width = dPanel.getWidth();
				int height = dPanel.getHeight();
				
				e.setText(Value.stringOf((Formula) getValue(), tvs));
				
				TypesetCoord tc = textDimension.getSize(font, e.getText());
				
				if (lineHeight <= 0)
					lineHeight = tc.y;

				e.setLineHeight(lineHeight);
				e.setWidth(tc.x);
				e.setHeight(lineHeight);
				
				if (dPanel.getHorizontalAlign() == LexElement.ALIGN_CENTER)
					e.setX(margin[0] + (width - e.getWidth()) / 2);
				else if (dPanel.getHorizontalAlign() == LexElement.ALIGN_RIGHT)
					e.setX(margin[0] + width - e.getWidth());
				else
					e.setX(margin[0]);

				if (dPanel.getVerticalAlign() == LexElement.ALIGN_MIDDLE)
					e.setY(margin[1] + (height - e.getHeight()) / 2);
				else if (dPanel.getVerticalAlign() == LexElement.ALIGN_BOTTOM)
					e.setY(margin[1] + height - e.getHeight());
				else
					e.setY(margin[1]);
				
				return null;
			}
		});

		return dPanel;
	}

	public LexElement build(TypesetParameters tvs)
	{
		if (margin == null)
			margin = new int[4];
		
		boolean resetAtFinal = (this.getMode() & TypesetElement.MODE_RESET_AT_FINAL) > 0;
		if (resetAtFinal)
			return buildFixed(tvs);
		
		DocumentPanel dPanel = new DocumentPanel();
		dPanel.setType(2);
//		dPanel.setAdditional("type", "text");
		dPanel.setColor(color);
		dPanel.setBgColor(bgColor);
		dPanel.setX(this.getX() == null ? 0 : this.getX().value(tvs));
		dPanel.setY(tvs.getDatum() + (this.getY() == null ? 0 : this.getY().value(tvs)));
		dPanel.setHorizontalAlign(this.getAlign());
		dPanel.setVerticalAlign(this.getVerticalAlign());
		dPanel.setBorder(valueOf(getLeftBorder(), tvs), valueOf(getTopBorder(), tvs), valueOf(getRightBorder(), tvs), valueOf(getBottomBorder(), tvs));
		dPanel.setBorderColor(this.getBorderColor());
		
		if (dPanel.getLeftBorder() >= 0 || dPanel.getRightBorder() >= 0)
			dPanel.setSplit(false);

		boolean fixed = isFixed();
		LexColor color = this.getColor();
		LexFont font = this.getFont();
		int bodyWidth = tvs.getPaper().getBody().getWidth().value(tvs);
		
		String text = null;
		try
		{
			text = Value.stringOf(this.getValue(), tvs);
		}
		catch (Exception e)
		{
			if (TypesetUtil.getMode() == TypesetUtil.MODE_FAIL)
			{
				throw new TypesetBuildException("exception in text's formula: " + this.getValue(), e);
			}
			else if (TypesetUtil.getMode() == TypesetUtil.MODE_ALWAYS)
			{
				//出错的情况下，更改为鲜艳的颜色，注意不能修改TypesetText的成员变量，只可以用局部变量传给下面的构造documenttext的函数
				fixed = true;
				color = LexColor.WHITE;
				text = "错误"; //this.getValue().toString();

				dPanel.setColor(color);
				dPanel.setBgColor(LexColor.RED);
				dPanel.setBorder(1, 1, 1, 1);
				dPanel.setBorderColor(LexColor.WHITE);
				
				System.out.println("exception in text's formula: " + this.getValue());
			}
		}
		
		if (lineHeight <= 0)
			lineHeight = textDimension.getSize(font, text).y;
		
		int fullWidth = this.getWidth() == null ? 0 : this.getWidth().value(tvs);
		int fullHeight = this.getHeight() == null ? 0 : this.getHeight().value(tvs);
		
		int width = fullWidth - margin[0] - margin[2];
		int height = fullHeight - margin[1] - margin[3];

//		TypesetParameters tvs2 = pack(tvs);
//		tvs2.setStreamY(tvs.getStreamY() + dPanel.getY());
		
		if (text == null)
			text = "";
		
		text += '\n';
		
//		if ("null\n".equals(text))
//			text = text + "";
		
		Integer textx = (Integer)tvs.get("text_x"); //layout偏移
		Integer texty = (Integer)tvs.get("text_y"); //layout偏移
		
		String line = "";
		int x = textx == null ? 0 : textx.intValue();
		int y = texty == null ? 0 : texty.intValue();
		int tw = 0;
		int pWidth = 0;
		int len = text.length();
		for (int i=0;i<len;i++)
		{
			char c = text.charAt(i);
			if (c == '\n')
			{
				TypesetCoord tc = textDimension.getSize(font, line);
				DocumentText sText = textOf(line, color, font, x, y, tc.x, tc.y);
				dPanel.add(sText);
				
				if (pWidth < tc.x)
					pWidth = tc.x;
				
				x = 0;
				y += lineHeight > 0 && i != len - 1 ? lineHeight : tc.y; //最后一个\n不能直接加lineheight，否则文字会偏下
				line = "";
			}
			else
			{
				TypesetCoord tc = textDimension.getSize(font, line + c);
				if ((x + tc.x > width && width > 0) || x + tc.x > bodyWidth)
				{
					DocumentText sText = textOf(line, color, font, x, y, tw, tc.y);
					dPanel.add(sText);

					if (pWidth < tw)
						pWidth = tw;

					tc.x = tc.x - tw;
					x = 0;
					y += lineHeight > 0 ? lineHeight : tc.y;
					line = "";
				}
				
				tw = tc.x;
				line += c;
			}
		}
		
//		//基准坐标可以作为推移画板的手段
//		if (height < tvs2.getDatum())
//			height = tvs2.getDatum();
			
		if (!fixed)
		{
			if (width < pWidth)
				width = pWidth;
			if (height < y)
				height = y;
		}

		int s = dPanel.getElementCount();
		for (int i=0;i<s;i++)
		{
			LexElement e = dPanel.getElement(i);
			
			if (this.getAlign() == LexElement.ALIGN_CENTER)
				e.setX(margin[0] + (width - e.getWidth()) / 2);
			else if (this.getAlign() == LexElement.ALIGN_RIGHT)
				e.setX(margin[0] + width - e.getWidth());
			else
				e.setX(margin[0]);

			if (this.getVerticalAlign() == LexElement.ALIGN_MIDDLE)
				e.setY(margin[1] + (height - y) / 2 + e.getY());
			else if (this.getAlign() == LexElement.ALIGN_BOTTOM)
				e.setY(margin[1] + height - y + e.getY());
			else
				e.setY(margin[1] + e.getY());
			
//			if (resetAtFinal && e instanceof DocumentText)
//			{
//				e.setMode(this.getMode());
//				((DocumentText)e).setPlus(this.getValue());
//			}
		}
		
		dPanel.setSize(fullWidth, height + margin[1] + margin[3]);
		resetY(tvs, dPanel);

		return dPanel;
	}
	
	private DocumentText textOf(String text, LexColor color, LexFont font, int x, int y, int width, int height)
	{
		DocumentText sText = new DocumentText
		(
			text, 
			color, 
			null,
			font,
			lineHeight,
			width, height, 
			this.getAlign(), this.getVerticalAlign()
		);
		sText.setColor(color);
		sText.setUnderline(underline);
		sText.setLocation(x, y);
		
		return sText;
	}
	
	public static Object[] format(String text, LexFont font, int width, int lineHeight)
	{
		text += '\n';
		
		List lineList = new ArrayList();
		String line = "";
		int y = 0;
		int len = text.length();
		for (int i=0;i<len;i++)
		{
			char c = text.charAt(i);
			if (c == '\n')
			{
				y += lineHeight > 0 ? lineHeight : textDimension.getSize(font, "\n").y;
				lineList.add(line);
				line = "";
			}
			else
			{
				TypesetCoord tc = textDimension.getSize(font, line + c);
				if (tc.x > width)
				{
					y += lineHeight > 0 ? lineHeight : tc.y;
					lineList.add(line);
					line = "";
				}
				
				line += c;
			}
		}
		
		text = null;
		for (int i=0;i<lineList.size();i++)
		{
			text = (text == null ? "" : text + "\n") + lineList.get(i);
		}

		return new Object[] {new Integer(y), text};
	}

	public static TextDimension getTextDimension()
	{
		return textDimension;
	}

	public static void setTextDimension(TextDimension textDimension)
	{
		TypesetText.textDimension = textDimension;
	}
}