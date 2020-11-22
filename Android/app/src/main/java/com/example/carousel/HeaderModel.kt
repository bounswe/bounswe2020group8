package com.example.carousel

import java.util.ArrayList
import java.util.TreeSet

import com.example.carousel.R
import com.example.carousel.R.string
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import com.example.carousel.MemberAccountPageItem
import info.androidhive.fontawesome.FontTextView

internal class CustomAdapter(var context: Context) : BaseAdapter() {

    private val mData = ArrayList<MemberAccountPageItem>()
    private val sectionHeader = TreeSet<Int>()
    private val mInflater: LayoutInflater

    init {
        mInflater = context
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
    }

    fun addItem(item: String, iconID: Int) {
        mData.add(MemberAccountPageItem(item, iconID))
        notifyDataSetChanged()
    }

    fun addSectionHeaderItem(item: String) {
        mData.add(MemberAccountPageItem(item, 0))
        sectionHeader.add(mData.size - 1)
        notifyDataSetChanged()
    }

    override fun getItemViewType(position: Int): Int {
        return if (sectionHeader.contains(position)) TYPE_SEPARATOR else TYPE_ITEM
    }

    override fun getViewTypeCount(): Int {
        return 2
    }

    override fun getCount(): Int {
        return mData.size
    }

    override fun getItem(position: Int): MemberAccountPageItem {
        return mData[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        var convertView = convertView
        var holder: ViewHolder? = null
        val rowType = getItemViewType(position)

        if (convertView == null) {
            holder = ViewHolder()
            when (rowType) {
                TYPE_ITEM -> {
                    convertView = mInflater.inflate(R.layout.snippet_item1, null)
                    holder.textView = convertView!!.findViewById<View>(R.id.text) as TextView
                    holder.fonTextView = convertView.findViewById<View>(R.id.icon) as FontTextView

                }
                TYPE_SEPARATOR -> {
                    convertView = mInflater.inflate(R.layout.snippet_item2, null)
                    holder.textView = convertView!!.findViewById<View>(R.id.textSeparator) as TextView
                }
            }
            convertView!!.tag = holder
        } else {
            holder = convertView.tag as ViewHolder
        }
        holder.textView!!.text = mData[position].Description
        if(rowType == TYPE_ITEM)
            holder.fonTextView!!.text = context.resources.getString(mData[position].IconID)

        return convertView
    }

    class ViewHolder {
        var textView: TextView? = null
        var fonTextView: FontTextView? = null

    }

    companion object {

        private val TYPE_ITEM = 0
        private val TYPE_SEPARATOR = 1
    }

}